/* ------------------------------------------------------------------
   Link inbox — a private staging queue for the Resources page.

   Links are saved to this browser's localStorage only. Nothing is
   uploaded, and nothing appears on the public page until the entries
   are written into RESOURCES in resources.js and pushed.

   The form is hidden by default. It appears on localhost, or on any
   URL with ?add=1 (or #add) — so a visitor never sees it, but it is
   one keystroke away on any device.

   Workflow:
     1. Paste links here as you find them.
     2. Hit "Download inbox.json" (or "Copy links").
     3. In Claude Code: "add the links in my inbox to the resources page".
     4. git push.
   ------------------------------------------------------------------ */

(function () {
  const STORAGE_KEY = 'resource-inbox';

  const readQueue = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return []; // corrupt or unavailable storage — start clean rather than break the page
    }
  };

  const writeQueue = (queue) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      return true;
    } catch (e) {
      return false; // private browsing / quota
    }
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Normalize for duplicate checks: ignore protocol, www, trailing slash and tracking params.
  function canonical(url) {
    try {
      const u = new URL(url);
      u.hash = '';
      ['s', 'si', 'utm_source', 'utm_medium', 'utm_campaign', 'rcm', 't'].forEach((p) => u.searchParams.delete(p));
      return (u.host.replace(/^www\./, '') + u.pathname.replace(/\/$/, '') + u.search).toLowerCase();
    } catch (e) {
      return String(url).trim().toLowerCase();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('inbox');
    if (!section) return;

    const params = new URLSearchParams(location.search);
    const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
    if (!isLocal && !params.has('add') && location.hash !== '#add') return;

    section.hidden = false;

    const form = document.getElementById('inbox-form');
    const urlEl = document.getElementById('inbox-url');
    const noteEl = document.getElementById('inbox-note');
    const listEl = document.getElementById('inbox-list');
    const countEl = document.getElementById('inbox-count');
    const emptyEl = document.getElementById('inbox-empty');
    const statusEl = document.getElementById('inbox-status');
    const copyBtn = document.getElementById('inbox-copy');
    const downloadBtn = document.getElementById('inbox-download');
    const clearBtn = document.getElementById('inbox-clear');

    // Bulk clear is a local-only control — never rendered on the published site.
    if (isLocal) clearBtn.hidden = false;

    let queue = readQueue();
    let statusTimer = null;

    function status(message, kind) {
      statusEl.textContent = message;
      statusEl.className = 'inbox-status' + (kind ? ' is-' + kind : '');
      clearTimeout(statusTimer);
      if (message) statusTimer = setTimeout(() => status(''), 4000);
    }

    // On localhost, mirror the queue into inbox.json via serve.py so Claude Code
    // can read it without a manual download. Silently inert on the published
    // site, or when the plain `python3 -m http.server` is running instead.
    function syncToDisk(announce) {
      if (!isLocal) return;
      fetch('/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queue),
      })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((res) => {
          if (announce) status('Added — written to inbox.json (' + res.stored + ' queued).', 'ok');
        })
        .catch(() => {
          if (announce) status('Added. (Not synced — start the server with: python3 serve.py)', 'ok');
        });
    }

    function save(announce) {
      if (!writeQueue(queue)) {
        status('Could not save — this browser is blocking local storage.', 'error');
      }
      render();
      syncToDisk(announce);
    }

    function render() {
      countEl.textContent = queue.length
        ? queue.length + (queue.length === 1 ? ' link queued' : ' links queued')
        : '';
      emptyEl.hidden = queue.length > 0;
      listEl.innerHTML = queue
        .map(
          (item, i) =>
            '<li>' +
            '<div class="inbox-item-main">' +
            '<a href="' + esc(item.url) + '" target="_blank" rel="noopener">' + esc(item.url) + '</a>' +
            (item.note ? '<span class="inbox-item-note">' + esc(item.note) + '</span>' : '') +
            '</div>' +
            '<button type="button" class="inbox-remove" data-index="' + i + '" aria-label="Remove">&times;</button>' +
            '</li>'
        )
        .join('');

      const hasItems = queue.length > 0;
      [copyBtn, downloadBtn, clearBtn].forEach((b) => (b.disabled = !hasItems));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const raw = urlEl.value.trim();
      if (!raw) return;

      let url;
      try {
        url = new URL(raw);
        if (!/^https?:$/.test(url.protocol)) throw new Error('protocol');
      } catch (err) {
        status('That does not look like a link. Include https://', 'error');
        urlEl.focus();
        return;
      }

      const key = canonical(raw);

      if (queue.some((item) => canonical(item.url) === key)) {
        status('Already in the queue.', 'error');
        return;
      }
      // RESOURCES is defined by resources.js, which loads before this file.
      if (typeof RESOURCES !== 'undefined' && RESOURCES.some((r) => canonical(r.url) === key)) {
        status('Already published on this page.', 'error');
        return;
      }

      queue.push({
        url: raw,
        note: noteEl.value.trim(),
        added: new Date().toISOString().slice(0, 10),
      });
      status('Added.', 'ok');
      save(true); // reports the synced count once inbox.json is written

      form.reset();
      urlEl.focus();
    });

    listEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.inbox-remove');
      if (!btn) return;
      queue.splice(Number(btn.dataset.index), 1);
      save();
    });

    copyBtn.addEventListener('click', function () {
      const text = queue.map((i) => (i.note ? i.url + '  — ' + i.note : i.url)).join('\n');
      navigator.clipboard.writeText(text).then(
        () => status('Copied ' + queue.length + ' links. Paste into Claude Code.', 'ok'),
        () => status('Copy blocked — use Download instead.', 'error')
      );
    });

    downloadBtn.addEventListener('click', function () {
      const blob = new Blob([JSON.stringify(queue, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'resources-inbox.json';
      a.click();
      URL.revokeObjectURL(a.href);
      status('Saved to your downloads folder.', 'ok');
    });

    clearBtn.addEventListener('click', function () {
      if (!confirm('Clear all ' + queue.length + ' queued links? Do this after they are on the page.')) return;
      queue = [];
      save();
      status('Queue cleared.', 'ok');
    });

    // Anything that has since been published drops out of the queue on its own,
    // so a synced link doesn't linger here waiting to be cleared by hand.
    if (typeof RESOURCES !== 'undefined') {
      const published = new Set(RESOURCES.map((r) => canonical(r.url)));
      const before = queue.length;
      queue = queue.filter((item) => !published.has(canonical(item.url)));
      const done = before - queue.length;
      if (done) {
        writeQueue(queue);
        status(done + (done === 1 ? ' link is' : ' links are') + ' now on the page — cleared from the queue.', 'ok');
      }
    }

    render();
    syncToDisk(false); // push anything still queued from a previous session
  });
})();
