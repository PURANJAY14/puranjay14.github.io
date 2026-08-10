#!/usr/bin/env python3
"""Local dev server for the site, with an inbox write endpoint.

Serves the site exactly like `python3 -m http.server`, and additionally
accepts POST /inbox from the Resources page. The posted queue is merged
into inbox.json in this folder, so links added in the browser show up as
a real file that Claude Code can read - no manual download step.

    python3 serve.py [port]        # default 8000, http://localhost:8000

Bound to localhost only: the endpoint writes a file, so it should not be
reachable from the network.
"""

import json
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INBOX = ROOT / "inbox.json"
MAX_BODY = 1 << 20  # 1 MB is far more than a link queue needs


def canonical(url):
    """Loose key for dedupe - mirrors the normalisation in inbox.js."""
    u = str(url).strip().lower()
    for prefix in ("https://", "http://"):
        if u.startswith(prefix):
            u = u[len(prefix):]
    if u.startswith("www."):
        u = u[4:]
    return u.rstrip("/")


def merge(existing, incoming):
    """Append entries whose URL is not already present, preserving order."""
    seen = {canonical(item.get("url", "")) for item in existing}
    merged = list(existing)
    for item in incoming:
        url = str(item.get("url", "")).strip()
        if not url or canonical(url) in seen:
            continue
        seen.add(canonical(url))
        merged.append({
            "url": url,
            "note": str(item.get("note", ""))[:500],
            "added": str(item.get("added", ""))[:10],
        })
    return merged


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path.rstrip("/") != "/inbox":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            self.send_error(400, "bad length")
            return
        if length <= 0 or length > MAX_BODY:
            self.send_error(400, "bad length")
            return

        try:
            incoming = json.loads(self.rfile.read(length))
            if not isinstance(incoming, list):
                raise ValueError("expected a list")
        except (ValueError, json.JSONDecodeError) as exc:
            self.send_error(400, f"bad payload: {exc}")
            return

        try:
            existing = json.loads(INBOX.read_text()) if INBOX.exists() else []
            if not isinstance(existing, list):
                existing = []
        except (OSError, json.JSONDecodeError):
            existing = []  # unreadable/corrupt - start over rather than lose the POST

        merged = merge(existing, incoming)
        added = len(merged) - len(existing)
        if merged:
            INBOX.write_text(json.dumps(merged, indent=2) + "\n")
            if added:
                print(f"  inbox.json <- {added} new link(s), {len(merged)} total")
        else:
            # Nothing queued anywhere - don't leave an empty file lying in the repo.
            INBOX.unlink(missing_ok=True)

        body = json.dumps({"stored": len(merged), "added": added}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # The queue is edited constantly during a session; never serve it stale.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        if self.command == "POST":
            super().log_message(fmt, *args)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Serving {ROOT} at http://localhost:{port}")
    print(f"Links added on the Resources page are written to {INBOX.name}")
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
