/* ------------------------------------------------------------------
   Study resources.
   To add a new entry, copy a block and fill it in. Fields:
     title    - name of the resource
     url      - link
     author   - person / org who made it (handle in `handle`)
     handle   - social handle or affiliation shown next to the author
     source   - where it lives (site name), used in search + shown on card
     type     - blog | thread | video | course | book | site | bench
     date     - human readable, "" if unknown
     category - one of CATEGORIES below
     added    - YYYY-MM-DD the link was saved (from inbox.json, not the
                resource's own publication date). Drives the sort control.
     summary  - 1-3 sentences on what is inside
     tags     - keywords you might search for later
     note     - optional extra pointer ("part of X", "mirrors Y", ...)
   ------------------------------------------------------------------ */

const CATEGORIES = [
  'GPU & Kernels',
  'LLM Inference',
  'Training & RL',
  'Agents & Harnesses',
  'Architectures',
  'Courses & Books',
  'Career',
];

const RESOURCES = [
  /* ---------------------------- GPU & Kernels ---------------------------- */
  {
    title: 'Retire the Abstractions',
    url: 'https://hazyresearch.stanford.edu/blog/2026-08-05-retire-the-abstractions',
    author: 'Stuart Sul, Chris Ré',
    handle: 'Hazy Research, Stanford',
    source: 'hazyresearch.stanford.edu',
    type: 'blog',
    date: 'Aug 5, 2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Argues that agents are eroding the value of CUDA DSLs and kernel abstractions as cognitive aids: if a model can generate optimized code from an underspecified prompt, the leverage shifts from elegant frameworks to oracles, tests and domain knowledge that pin down correctness.',
    tags: ['cuda', 'dsl', 'kernel abstractions', 'code generation', 'thunderkittens', 'agents'],
  },
  {
    title: 'What happens when you run a CUDA kernel',
    url: 'https://fergusfinn.com/blog/what-happens-when-you-run-a-gpu-kernel/',
    author: 'Fergus Finn',
    handle: '',
    source: 'fergusfinn.com',
    type: 'blog',
    date: 'Jun 29, 2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Follows one vector-add kernel end to end: nvcc lowering device code to SASS, the CPU talking to the GPU through pushbuffers, GPFIFO and memory-mapped doorbells, and the compute work distributor scheduling warps onto SMs. Excellent if you want the layer below "launch a kernel".',
    tags: ['cuda', 'sass', 'nvcc', 'driver', 'warp scheduling', 'gpu internals', 'ptx'],
  },
  {
    title: 'Modern GPU Programming for MLSys',
    url: 'https://mlc.ai/modern-gpu-programming-for-mlsys/',
    author: 'MLC community (CMU MLSys course lineage)',
    handle: 'mlc.ai',
    source: 'mlc.ai',
    type: 'book',
    date: '2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Open-source textbook on kernel optimization for ML systems, targeted at NVIDIA Blackwell. Goes from execution model, data layouts, TMA, tensor memory and mbarrier through a tiled → pipelined → warp-specialized GEMM, ending at Flash Attention 4, all in the TIRx Python DSL.',
    tags: ['blackwell', 'gemm', 'flash attention 4', 'tma', 'tmem', 'warp specialization', 'tirx', 'tensor cores'],
  },
  {
    title: 'vibecoding gpu kernels',
    url: 'https://x.com/maharshii/status/2086442755748970889',
    author: 'maharshi',
    handle: '@maharshii · ML perf optimizer at fal',
    source: 'X (article)',
    type: 'thread',
    date: 'Aug 9, 2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Write-up on using frontier models (Claude Opus 5, GPT-5.6) to generate GPU kernels instead of hand-writing them — what the workflow looks like in practice, where it holds up and where it does not.',
    tags: ['gpu kernels', 'llm codegen', 'cuda', 'vibecoding', 'developer workflow'],
  },
  {
    title: 'CUDA matmul optimization: max fu\'s reading list',
    url: 'https://x.com/maxxfuu/status/2085255169516896296',
    author: 'max fu',
    handle: '@maxxfuu',
    source: 'X',
    type: 'thread',
    date: 'Aug 6, 2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Short list of the resources that actually helped when learning to write fast kernels: Simon Boehm\'s CUDA matmul walkthrough, Abhik Sarkar\'s matrix-multiplication optimization article, Robert Zhang\'s CUDA MMM post, plus PMPP v5.',
    tags: ['cuda', 'matmul', 'gemm', 'siboehm', 'pmpp', 'learning path', 'sgemm'],
    note: 'Links out to siboehm.com/articles/22/CUDA-MMM, abhik.ai and robertzhang.me/blog/cuda-mmm.',
  },
  {
    title: 'Mixture-of-Kittens (MoK): open-source MoE training megakernel',
    url: 'https://x.com/cursor_ai/status/2084670806613737919',
    author: 'Cursor',
    handle: '@cursor_ai',
    source: 'X',
    type: 'thread',
    date: 'Aug 4, 2026',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Cursor open-sourcing their MoE training megakernel for NVL72 systems. It fuses all Mixture-of-Experts communication and computation into a single fully deterministic kernel and reports up to 2.37× over the strongest public baselines.',
    tags: ['moe', 'megakernel', 'nvl72', 'determinism', 'training', 'thunderkittens', 'all-to-all'],
  },
  {
    title: 'Lecture 75 [ScaleML]: GPU Programming Fundamentals + ThunderKittens',
    url: 'https://youtu.be/Cl2B_hmg4gA',
    author: 'GPU MODE',
    handle: 'ScaleML series',
    source: 'YouTube',
    type: 'video',
    date: '',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'GPU programming fundamentals lecture from the ScaleML series, building up to the ThunderKittens tile framework. Good entry point if you want the mental model before touching kernel code.',
    tags: ['gpu mode', 'thunderkittens', 'lecture', 'scaleml', 'cuda fundamentals'],
  },
  {
    title: 'CUDA + ThunderKittens, but increasingly drunk',
    url: 'https://www.youtube.com/watch?v=xcpEl0cGCC4&t=4544s',
    author: 'Benjamin Spector',
    handle: 'Hazy Research / ThunderKittens author',
    source: 'YouTube',
    type: 'video',
    date: '',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'Long-form, informal live stream by the ThunderKittens author writing CUDA and TK kernels. Unpolished on purpose — you get the reasoning and the debugging, not a cleaned-up final answer.',
    tags: ['thunderkittens', 'cuda', 'livestream', 'kernel writing'],
  },
  {
    title: 'CUDA Live: Your Parallel Programming Guide',
    url: 'https://youtu.be/ftI48A8K5Vg',
    author: 'NVIDIA Developer',
    handle: 'NVIDIA',
    source: 'YouTube',
    type: 'video',
    date: '',
    category: 'GPU & Kernels',
    added: '2026-08-10',
    summary:
      'NVIDIA\'s own guided walkthrough of parallel programming with CUDA — official framing of the programming model, tooling and where to start.',
    tags: ['cuda', 'nvidia', 'parallel programming', 'tutorial'],
  },

  /* ---------------------------- LLM Inference ---------------------------- */
  {
    title: 'Inside vLLM: Anatomy of a High-Throughput LLM Inference System',
    url: 'https://www.aleksagordic.com/blog/vllm#cpt1',
    author: 'Aleksa Gordić',
    handle: '',
    source: 'aleksagordic.com',
    type: 'blog',
    date: 'Aug 29, 2025',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'The long one on vLLM. Builds from a single-GPU offline engine up to distributed multi-node serving, covering paged attention, continuous batching, prefix caching, speculative decoding and TP/PP, and shows how the latency-vs-throughput tension drives the architecture.',
    tags: ['vllm', 'paged attention', 'kv cache', 'continuous batching', 'speculative decoding', 'prefix caching', 'serving', 'tensor parallelism'],
  },
  {
    title: 'LLM Inference Handbook',
    url: 'https://handbook.modular.com/',
    author: 'Modular',
    handle: '',
    source: 'handbook.modular.com',
    type: 'book',
    date: '',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Glossary + guidebook + reference for LLM inference in one place: foundations (TTFT, TPS, training vs inference), planning and deployment, optimization (continuous batching, prefix caching, prefill-decode disaggregation), GPU architecture and kernel work, and production ops. Has interactive simulators and calculators.',
    tags: ['inference', 'ttft', 'tokens per second', 'batching', 'prefix caching', 'disaggregation', 'deployment', 'reference'],
  },
  {
    title: 'Inference Engineering (interactive guide)',
    url: 'https://inferenceengineering.tech/',
    author: 'Philip Kiely',
    handle: '@philipkiely · Baseten',
    source: 'inferenceengineering.tech',
    type: 'course',
    date: '2026',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Eight-chapter interactive course on the full inference stack, from GPU hardware up to production autoscaling — animated diagrams, calculators and quizzes. Covers quantization, speculative decoding, KV caching, vLLM/SGLang/TensorRT-LLM, observability and multimodal inference.',
    tags: ['inference', 'baseten', 'quantization', 'kv cache', 'sglang', 'tensorrt-llm', 'autoscaling', 'interactive'],
  },
  {
    title: 'The Engineering behind LLM Inference From First Principles (playlist)',
    url: 'https://www.youtube.com/playlist?list=PLqO45Dg1pMhlDBZTMqVL2GU-14xYip2y2',
    author: 'PY',
    handle: '',
    source: 'YouTube',
    type: 'video',
    date: '',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Video series deriving the LLM inference stack from first principles rather than starting from an existing serving framework.',
    tags: ['inference', 'first principles', 'playlist', 'serving'],
  },
  {
    title: 'Profiling LLM Inference with SGLang and Torch Profiler',
    url: 'https://x.com/jino_rohit/status/2085947942339563598',
    author: 'Jino Rohit',
    handle: '@jino_rohit · ML performance and systems',
    source: 'X (article)',
    type: 'thread',
    date: 'Aug 8, 2026',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Hands-on profiling of an LLM served with SGLang using its built-in torch profiler integration, then reasoning about the kernel patterns and bottlenecks you typically hit in production.',
    tags: ['sglang', 'torch profiler', 'profiling', 'bottlenecks', 'inference', 'kernels'],
  },
  {
    title: 'Speculative Decoding from First Principles',
    url: 'https://jwlabs.vercel.app/post/speculative-decoding-first-principles',
    author: 'JW Labs Research Team',
    handle: '',
    source: 'jwlabs.vercel.app',
    type: 'blog',
    date: '',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Derivation of speculative decoding from scratch — why the draft-then-verify scheme preserves the target distribution and where the speedup actually comes from.',
    tags: ['speculative decoding', 'draft model', 'sampling', 'inference', 'first principles'],
  },
  {
    title: 'Autoscaling endpoints for LLM inference',
    url: 'https://x.com/soyoung_park/status/2083311077476184255',
    author: 'SoYoung Park',
    handle: '@soyoung_park · Together AI',
    source: 'X (article)',
    type: 'thread',
    date: 'Jul 31, 2026',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Practical notes on autoscaling dedicated inference deployments: which scaling metric to key off, how to tune the scaling windows, and how to budget for cold starts.',
    tags: ['autoscaling', 'together ai', 'cold start', 'deployment', 'serving', 'ops'],
  },
  {
    title: 'How we built the world\'s fastest API for GLM-5.2',
    url: 'https://x.com/philipkiely/status/2069212319746506968',
    author: 'Philip Kiely',
    handle: '@philipkiely · Baseten',
    source: 'X (article)',
    type: 'thread',
    date: 'Jun 23, 2026',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'Case study on serving GLM-5.2 at record speed — the model is roughly GPT-5.5 / Opus 4.8 class at 70-80% lower cost, and the post walks through what it took on the serving side.',
    tags: ['glm-5.2', 'baseten', 'serving', 'latency', 'open models', 'case study'],
  },
  {
    title: 'Inside TPU and GPU Clusters: The Anatomy of Collective Communication',
    url: 'https://www.aleksagordic.com/blog/collective-operations',
    author: 'Aleksa Gordić',
    handle: '',
    source: 'aleksagordic.com',
    type: 'blog',
    date: 'Jul 14, 2026',
    category: 'LLM Inference',
    added: '2026-08-10',
    summary:
      'How data actually moves through clusters: TPU torus vs GPU hierarchical fat-tree topologies, then All-Gather / Reduce-Scatter / All-Reduce / All-to-All implemented via ring and tree algorithms, plus in-network reduction (SHARP).',
    tags: ['nccl', 'all-reduce', 'all-to-all', 'ring algorithm', 'sharp', 'topology', 'tpu', 'sharding', 'distributed'],
  },

  /* ---------------------------- Training & RL ---------------------------- */
  {
    title: 'RL for LLMs: The Reading List',
    url: 'https://algoroxyolo.github.io/blog/2026/rl-reading-list/',
    author: 'Yunze (Lorenzo) Xiao',
    handle: '',
    source: 'algoroxyolo.github.io',
    type: 'blog',
    date: 'Updated Mar 2026 (v8)',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Curated taxonomy of ~96 RL-for-LLM papers across algorithms, reward modelling, preference optimization, systems and agent frameworks, with suggested reading depth per paper. Covers PPO → GRPO / DAPO / CISPO and the reasoning + tool-use wave.',
    tags: ['rl', 'rlhf', 'ppo', 'grpo', 'dapo', 'reward modeling', 'dpo', 'paper list', 'reading list'],
  },
  {
    title: 'Beyond PPO — The New Wave of Policy Optimization Techniques for LLM Post-Training',
    url: 'https://ydnyshhh.github.io/posts/policy_optimization/',
    author: 'Yadnyesh',
    handle: '',
    source: 'ydnyshhh.github.io',
    type: 'blog',
    date: 'Dec 28, 2025',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Walks through nine policy optimization methods after PPO — GRPO onward to SAPO — and what each is fixing: critic overhead, weak advantage estimation, instability on long reasoning traces. Organised around the real design axes: hard clipping vs soft gating, token- vs sequence-level importance ratios, MoE routing drift (RSPO), and variance control via geometric means, dynamic sampling and adaptive temperature gating.',
    tags: ['ppo', 'grpo', 'sapo', 'rspo', 'policy optimization', 'post-training', 'importance sampling', 'trust region', 'clipping', 'variance reduction', 'moe', 'rl'],
  },
  {
    title: 'Zero train–inference mismatch for linear attention under async RL',
    url: 'https://x.com/yichuanm/status/2085463113189802207',
    author: 'Yichuan Wang',
    handle: '@YichuanM · EECS PhD, UC Berkeley (Sky Lab / BAIR)',
    source: 'X',
    type: 'thread',
    date: 'Aug 6, 2026',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Bitwise-exact trainer/generator parity for Gated DeltaNet (Qwen3.5-9B and 35B-A3B) on TorchTitan RL + vLLM, then measures whether zero mismatch actually helps async off-policy RL. Recipe: one shared model definition, recurrent kernel on the forward, split-K off, batch-invariant GEMM and a batch-invariant router bmm.',
    tags: ['async rl', 'off-policy', 'batch invariance', 'determinism', 'gated deltanet', 'torchtitan', 'vllm', 'logprob mismatch', 'linear attention'],
  },
  {
    title: 'Reliable RL Scaling Requires Accounting for Prefill-Decode Kernel Mismatch',
    url: 'https://yifanzhang-pro.github.io/Pretraining-RL-Science/',
    author: 'Yifan Zhang et al.',
    handle: 'Pretraining RL Science',
    source: 'yifanzhang-pro.github.io',
    type: 'blog',
    date: 'Aug 9, 2026',
    category: 'Training & RL',
    added: '2026-08-14',
    summary:
      'A rollout is only on-policy if the post-sampling behavior distribution matches the declared target — which breaks when generation runs the recurrent decode kernel while learning scores tokens with the parallel prefill kernel, so one checkpoint becomes two effective policies. Linear attention and SSMs are structurally most exposed, since a small state discrepancy propagates through every later update. Four remedies: treat the mismatch as off-policy data with explicit importance ratios, fix a canonical execution rule across both paths, raise precision on the sensitive computations, or reject-sample against the recurrent target as ground truth.',
    tags: ['rl', 'prefill', 'decode', 'kernel mismatch', 'on-policy', 'off-policy', 'importance sampling', 'linear attention', 'ssm', 'numerical precision', 'rejection sampling', 'determinism'],
    note: 'Landing page links the full PDF report and the GitHub repo. Pairs closely with the async-RL train/inference mismatch thread above.',
  },
  {
    title: 'Skaling: Chinchilla\'s Exponents Meet Kaplan\'s Coupling',
    url: 'https://x.com/omarsar0/status/2086845790983716917',
    author: 'elvis (Elvis Saravia)',
    handle: '@omarsar0 · founder, DAIR.AI',
    source: 'X',
    type: 'thread',
    date: 'Aug 12, 2026',
    category: 'Training & RL',
    added: '2026-08-14',
    summary:
      'Walkthrough of a Meta scaling-law paper that drops the usual assumption that model size and data act on loss independently, coupling capacity and data through a single interaction exponent. The extra term cuts mean absolute percentage error 1.5-3× on both interpolation and extrapolation, with the biggest corrections in the data-scarce and heavy-overtraining regimes where Chinchilla and Kaplan forms drift. Fit on a sparse grid of low-compute runs, it extrapolates the full grid with roughly 10× less compute than a uniform sweep.',
    tags: ['scaling laws', 'chinchilla', 'kaplan', 'pretraining', 'compute optimal', 'overtraining', 'extrapolation', 'meta', 'budget planning'],
    note: 'Paper: arxiv.org/abs/2608.07222 — Videau, Youbi-Idrissi, Lopez-Paz, Ahuja.',
  },
  {
    title: 'LLM Optimization Interview Notes: Training and Inference',
    url: 'https://x.com/gauri__gupta/status/2051882947758993815',
    author: 'Gauri Gupta',
    handle: '@gauri__gupta · co-founder/CEO NeoSigma, ex-MIT',
    source: 'X (article)',
    type: 'thread',
    date: 'May 6, 2026',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Personal interview-prep notes from rounds at several frontier labs, collecting the core ideas behind efficient large-scale training and inference in one place. Useful as a checklist of what gets asked.',
    tags: ['interview prep', 'efficiency', 'training', 'inference', 'notes', 'systems'],
  },
  {
    title: 'PostTrainBench',
    url: 'https://x.com/posttrainbench',
    author: 'Karina Nguyen, ThoughtfulLab',
    handle: '@karinanguyen, @ThoughtfulLab_',
    source: 'X (account)',
    type: 'bench',
    date: '',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Benchmark measuring how well CLI coding agents (Claude Code, Codex CLI, …) can post-train a base LLM given a single H100 for 10 hours. Follow the account for results and methodology.',
    tags: ['benchmark', 'post-training', 'agents', 'claude code', 'codex', 'h100', 'evaluation'],
  },
  {
    title: 'Lean AI formalization leaderboard',
    url: 'https://lean-lang.org/eval/',
    author: 'Lean FRO',
    handle: 'lean-lang.org',
    source: 'lean-lang.org',
    type: 'bench',
    date: '',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'Official Lean leaderboard tracking how well AI models formalize mathematics in Lean — a verifier-grounded eval where correctness is machine-checked rather than judged.',
    tags: ['lean', 'formalization', 'theorem proving', 'leaderboard', 'evaluation', 'verifiable rewards'],
  },
  {
    title: 'Stanford CS336 Lec. 3: Architectures, Hyperparameters',
    url: 'https://www.youtube.com/watch?v=ptFiH_bHnJw',
    author: 'Stanford Online',
    handle: 'CS336: Language Modeling from Scratch, Spring 2025',
    source: 'YouTube',
    type: 'course',
    date: 'Spring 2025',
    category: 'Training & RL',
    added: '2026-08-10',
    summary:
      'CS336 lecture on architecture and hyperparameter choices when building a language model from scratch — what the standard choices are and why they settled where they did.',
    tags: ['cs336', 'stanford', 'architecture', 'hyperparameters', 'pretraining', 'lecture'],
  },

  /* ------------------------- Agents & Harnesses -------------------------- */
  {
    title: 'Language model harnesses are compositional generalizers',
    url: 'https://alexzhang13.github.io/blog/2026/harness/',
    author: 'Alex L. Zhang',
    handle: '',
    source: 'alexzhang13.github.io',
    type: 'blog',
    date: 'Jul 2026',
    category: 'Agents & Harnesses',
    added: '2026-08-10',
    summary:
      'Argues a good harness gets compositional generalization by keeping every individual LM call locally in-distribution. Recursive Language Models using context offloading and programmatic sub-agent calls train on short tasks and generalize to tasks 8-32× longer, and transfer across domains far better than vanilla Transformers.',
    tags: ['harness', 'rlm', 'recursive language models', 'compositional generalization', 'length generalization', 'context offloading', 'sub-agents'],
  },
  {
    title: 'Prime Agent: a fully open-source self-improving harness',
    url: 'https://x.com/akshay_pachaar/status/2085422902724485432',
    author: 'Akshay Pachaar',
    handle: '@akshay_pachaar · Daily Dose of DS',
    source: 'X',
    type: 'thread',
    date: 'Aug 6, 2026',
    category: 'Agents & Harnesses',
    added: '2026-08-10',
    summary:
      'Explainer on Prime Intellect\'s Prime Agent, which turns a frontier model into a Recursive Language Model: a persistent IPython kernel is the only tool, so long inputs never enter the prompt. The "Continual Harness" keeps four kinds of writable state outside the conversation — prompt, memory, skills and sub-agent specs.',
    tags: ['prime intellect', 'rlm', 'continual harness', 'agent memory', 'skills', 'sub-agents', 'ipython'],
  },
  {
    title: 'Tencent open-source agent memory system',
    url: 'https://x.com/tencentai_news/status/2054822609863496178',
    author: 'Tencent AI',
    handle: '@TencentAI_News',
    source: 'X',
    type: 'thread',
    date: 'May 14, 2026',
    category: 'Agents & Harnesses',
    added: '2026-08-10',
    summary:
      'Six months on agents losing context in long sessions, then open-sourced. Reported: compressing stale context mid-session cut token usage 61%, a mermaid-based structured task map made 30+ step workflows far less likely to derail, and persona coherence went 48% → 76% with dedicated persona memory.',
    tags: ['agent memory', 'context compression', 'long horizon', 'persona', 'tencent', 'open source'],
    note: 'Repo: github.com/TencentCloud/TencentDB-Agent-Memory',
  },
  {
    title: 'Formation complète Claude Code (6 h)',
    url: 'https://x.com/Jouhatsu_ai/status/2054942057429438970',
    author: 'Jouhatsu',
    handle: '@Jouhatsu_ai',
    source: 'X (video)',
    type: 'video',
    date: 'May 14, 2026',
    category: 'Agents & Harnesses',
    added: '2026-08-10',
    summary:
      'Six-hour end-to-end Claude Code course (in French): configuration, building workflows, deploying sites, assembling agent teams, browser automation, and pricing/packaging the skill.',
    tags: ['claude code', 'course', 'french', 'workflows', 'agent teams', 'browser automation'],
  },

  /* ----------------------------- Architectures --------------------------- */
  {
    title: 'Path to continual learning: Kimi K3\'s KDA as fast programmable weights & NoROPE for infinite context',
    url: 'https://x.com/bookwormengr/status/2085954914115834304',
    author: 'GDP',
    handle: '@bookwormengr · AI model & hardware co-design',
    source: 'X (article)',
    type: 'thread',
    date: 'Aug 8, 2026',
    category: 'Architectures',
    added: '2026-08-10',
    summary:
      'Reads Kimi K3\'s Kimi Delta Attention as fast programmable weights and NoROPE as the path to long/infinite context, framing both as a route toward continual learning. Technical but written to be followed.',
    tags: ['kimi k3', 'kda', 'continual learning', 'norope', 'long context', 'fast weights', 'linear attention'],
  },
  {
    title: 'Towards Looped Models Done Right — Part I',
    url: 'https://x.com/huskydogewoof/status/2083242247945126203',
    author: 'Benhao Huang',
    handle: '@huskydogewoof · MS student, CMU MLD',
    source: 'X',
    type: 'thread',
    date: 'Jul 31, 2026',
    category: 'Architectures',
    added: '2026-08-10',
    summary:
      'Apples-to-apples ablations of looped (weight-shared-across-depth) models from Ouro to Huginn under matched training and inference FLOPs. Huginn wins overall, driven by the loop-in-the-middle sandwich design plus input injection; an 8B-A0.8B Huginn MoE matches or beats a 32B-A3.2B feedforward MoE on several reasoning benchmarks with 75% fewer resident params.',
    tags: ['looped models', 'weight sharing', 'huginn', 'ouro', 'moe', 'reasoning', 'ablations', 'recurrent depth'],
  },
  {
    title: 'Linear attention / DeltaNet / KDA study list',
    url: 'https://x.com/kimbochen/status/2084320516580561389',
    author: 'Kimbo Chen',
    handle: '@kimbochen',
    source: 'X',
    type: 'thread',
    date: 'Aug 3, 2026',
    category: 'Architectures',
    added: '2026-08-10',
    summary:
      'A path through modern linear attention: Songlin Yang\'s video explanations and design-intuition blog, the chunkwise DeltaNet kernel algorithm, FlashKDA, vLLM serving explanations, Zhihu posts on AttnRes training/inference, Jianlin Su\'s MoE series from math first principles, plus the Kimi Linear / LatentMoE / Kimi K3 papers.',
    tags: ['linear attention', 'deltanet', 'kda', 'flashkda', 'songlin yang', 'moe', 'kimi linear', 'chunkwise', 'reading list'],
  },

  /* --------------------------- Courses & Books --------------------------- */
  {
    title: 'The CUDA Handbook, v2.0',
    url: 'https://www.cudahandbook.com/book/',
    author: 'Nicholas Wilt',
    handle: '',
    source: 'cudahandbook.com',
    type: 'book',
    date: 'v2.0, work in progress',
    category: 'Courses & Books',
    added: '2026-08-10',
    summary:
      'Full text of the second edition being released online as a work in progress. Parts cover hardware and software architecture, the software environment, memory, streams/events/graphs and kernel execution — the comprehensive reference rather than a tutorial.',
    tags: ['cuda', 'reference', 'handbook', 'memory model', 'streams', 'cuda graphs', 'hardware architecture'],
  },
  {
    title: 'Programming Massively Parallel Processors (course PDF)',
    url: 'https://www.cse.iitd.ac.in/~rijurekha/col730_2022/cudabook.pdf',
    author: 'David Kirk, Wen-mei Hwu',
    handle: 'mirrored for COL730, IIT Delhi',
    source: 'cse.iitd.ac.in',
    type: 'book',
    date: 'COL730, 2022',
    category: 'Courses & Books',
    added: '2026-08-10',
    summary:
      'The classic PMPP text, hosted as course material for IIT Delhi\'s COL730 parallel programming class: CUDA memories, performance considerations, floating point, computational thinking, case studies (MRI reconstruction, molecular visualization) and an OpenCL intro.',
    tags: ['pmpp', 'kirk hwu', 'cuda', 'textbook', 'col730', 'iit delhi', 'parallel programming', 'pdf'],
  },
  {
    title: 'Programming Parallel Computers (Aalto)',
    url: 'https://ppc.cs.aalto.fi/lecture1/',
    author: 'Aalto University',
    handle: 'ppc.cs.aalto.fi',
    source: 'ppc.cs.aalto.fi',
    type: 'course',
    date: '',
    category: 'Courses & Books',
    added: '2026-08-10',
    summary:
      'Aalto\'s well-regarded parallel programming course with an auto-grading submission system. Lecture 1 sets up why parallelism, baseline implementations, linear memory access and instruction-level parallelism before moving into multicore and vectorization.',
    tags: ['parallel programming', 'ilp', 'vectorization', 'multicore', 'cache', 'aalto', 'exercises', 'cpu'],
  },

  {
    title: 'CS 162: Operating Systems and Systems Programming (Berkeley)',
    url: 'https://www.youtube.com/watch?v=pPzVV2kkGHc&list=PLF2K2xZjNEf97A_uBCwEl61sdxWVP7VWC',
    author: 'John Kubiatowicz',
    handle: 'UC Berkeley',
    source: 'YouTube',
    type: 'course',
    date: '',
    category: 'Courses & Books',
    added: '2026-08-10',
    summary:
      'Berkeley\'s full undergraduate OS lecture series — processes and threads, concurrency and synchronization, scheduling, address translation and virtual memory, filesystems and I/O, then networking, distributed systems and reliability. The systems foundation that everything above the kernel quietly assumes.',
    tags: ['operating systems', 'cs162', 'berkeley', 'kubiatowicz', 'concurrency', 'synchronization', 'scheduling', 'virtual memory', 'filesystems', 'distributed systems', 'lecture series'],
    note: 'Link opens Lecture 1 ("What is an Operating System?") within the playlist.',
  },

  /* -------------------------------- Career ------------------------------- */
  {
    title: 'System design roadmap for SDE1 → SDE3',
    url: 'https://www.linkedin.com/posts/ankur-dhawan01_sde1-sde2-sde3-share-7437350411189182464-jIqA/',
    author: 'Ankur Dhawan',
    handle: '',
    source: 'LinkedIn',
    type: 'thread',
    date: '',
    category: 'Career',
    added: '2026-08-10',
    summary:
      'Checklist-style system design roadmap: 11 key concepts (scalability, latency vs throughput, CAP, ACID, rate limiting, consistency models, fault tolerance), 15 building blocks (caching, sharding, indexing, queues, gateways, WebSockets) and 4 architectural patterns. Framing: "DSA gets you in, system design decides how far you go."',
    tags: ['system design', 'interview', 'cap theorem', 'sharding', 'caching', 'microservices', 'career', 'sde'],
  },
];

/* ------------------------------------------------------------------ */

const TYPE_LABELS = {
  blog: 'Blog',
  thread: 'Thread',
  video: 'Video',
  course: 'Course',
  book: 'Book',
  site: 'Site',
  bench: 'Benchmark',
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Escape first, then wrap the matched terms in <mark>.
function highlight(text, terms) {
  const safe = escapeHtml(text);
  if (!terms.length) return safe;
  const re = new RegExp('(' + terms.map(escapeRegExp).join('|') + ')', 'gi');
  return safe.replace(re, '<mark>$1</mark>');
}

// "2026-08-10" -> "Aug 10, 2026". Parsed by hand rather than via Date so the
// label never shifts a day because of the viewer's timezone.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatAdded(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return '';
  return MONTHS[Number(m[2]) - 1] + ' ' + Number(m[3]) + ', ' + m[1];
}

function haystack(r) {
  return [r.title, r.author, r.handle, r.source, r.category, r.date, r.summary, r.note || '', r.tags.join(' '), TYPE_LABELS[r.type] || r.type, formatAdded(r.added)]
    .join(' ')
    .toLowerCase();
}

document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.getElementById('resource-list');
  const searchEl = document.getElementById('resource-search');
  const clearEl = document.getElementById('search-clear');
  const countEl = document.getElementById('resource-count');
  const filtersEl = document.getElementById('resource-filters');
  const emptyEl = document.getElementById('resource-empty');

  const sortEl = document.getElementById('resource-sort');

  // _order preserves the hand-curated file order so "By topic" can restore it,
  // and doubles as a stable tie-break when many links share an added date.
  const indexed = RESOURCES.map((r, i) => ({ ...r, _hay: haystack(r), _order: i }));
  let activeCategory = 'All';

  // Category chips, ordered by CATEGORIES with counts.
  const present = CATEGORIES.filter((c) => indexed.some((r) => r.category === c));
  ['All', ...present].forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (cat === 'All' ? ' active' : '');
    btn.type = 'button';
    btn.dataset.category = cat;
    const n = cat === 'All' ? indexed.length : indexed.filter((r) => r.category === cat).length;
    btn.innerHTML = escapeHtml(cat) + ' <span class="chip-count">' + n + '</span>';
    btn.addEventListener('click', () => {
      activeCategory = cat;
      filtersEl.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === btn));
      render();
    });
    filtersEl.appendChild(btn);
  });

  function cardHtml(r, terms) {
    const meta = [];
    if (r.author) meta.push('<span class="r-author">' + highlight(r.author, terms) + '</span>');
    if (r.handle) meta.push('<span>' + highlight(r.handle, terms) + '</span>');
    if (r.source) meta.push('<span>' + highlight(r.source, terms) + '</span>');
    if (r.date) meta.push('<span>' + highlight(r.date, terms) + '</span>');

    return (
      '<article class="resource-card">' +
      '<div class="r-top">' +
      '<span class="r-type r-type-' + r.type + '">' + (TYPE_LABELS[r.type] || r.type) + '</span>' +
      '<span class="r-category">' + highlight(r.category, terms) + '</span>' +
      (r.added ? '<span class="r-added" title="Date this link was added to the page">' + highlight(formatAdded(r.added), terms) + '</span>' : '') +
      '</div>' +
      '<h3 class="r-title"><a href="' + escapeHtml(r.url) + '" target="_blank" rel="noopener">' +
      highlight(r.title, terms) +
      '</a></h3>' +
      '<p class="r-meta">' + meta.join('<span class="r-dot">·</span>') + '</p>' +
      '<p class="r-summary">' + highlight(r.summary, terms) + '</p>' +
      (r.note ? '<p class="r-note">' + highlight(r.note, terms) + '</p>' : '') +
      '<ul class="r-tags">' +
      r.tags.map((t) => '<li>' + highlight(t, terms) + '</li>').join('') +
      '</ul>' +
      '</article>'
    );
  }

  function render() {
    const q = searchEl.value.trim().toLowerCase();
    const terms = q ? q.split(/\s+/).filter(Boolean) : [];

    const matches = indexed.filter((r) => {
      if (activeCategory !== 'All' && r.category !== activeCategory) return false;
      return terms.every((t) => r._hay.includes(t)); // AND across terms
    });

    // ISO dates sort correctly as plain strings; entries with no date sink to
    // the end either way, and file order breaks ties.
    const mode = sortEl.value;
    if (mode === 'newest' || mode === 'oldest') {
      const dir = mode === 'newest' ? -1 : 1; // ascending by date, then flipped
      matches.sort((a, b) => {
        const x = a.added || '', y = b.added || '';
        if (x === y) return a._order - b._order;
        if (!x) return 1; // undated entries always sink to the bottom
        if (!y) return -1;
        return (x < y ? -1 : 1) * dir;
      });
    }

    listEl.innerHTML = matches.map((r) => cardHtml(r, terms)).join('');
    emptyEl.hidden = matches.length > 0;
    clearEl.hidden = q.length === 0;
    countEl.textContent =
      matches.length + (matches.length === 1 ? ' resource' : ' resources') +
      (matches.length !== indexed.length ? ' of ' + indexed.length : '');
  }

  searchEl.addEventListener('input', render);
  sortEl.addEventListener('change', render);
  clearEl.addEventListener('click', () => {
    searchEl.value = '';
    searchEl.focus();
    render();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchEl) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
    } else if (e.key === 'Escape' && document.activeElement === searchEl) {
      searchEl.value = '';
      render();
      searchEl.blur();
    }
  });

  render();
});
