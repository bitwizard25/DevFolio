// Case-study content — single source of truth for /projects/[slug] pages.
//
// CONTENT SOURCING RULE: every number, decision rationale, and before/after claim below is a
// DRAFT derived from what already exists on the site. Anything marked [VERIFY] or [TODO] must
// be confirmed (or corrected) by Raj before deploy, then its `verified` flag flipped to true.
// Release gate: `rg "VERIFY|TODO" lib/` should come back empty (or consciously accepted).

export interface Metric {
  label: string;
  /** Display string, e.g. "60%" */
  value: string;
  /** For the count-up animation */
  numericValue: number;
  suffix: string;
  /** The formula sentence: "Reduced X by Y% by doing Z. Measured via ..." */
  formula: string;
  verified: boolean;
}

export interface Decision {
  choice: string;
  alternative: string;
  /** One-liner: what problem forced the choice */
  context: string;
  rationale: string;
  tradeoffs: {
    accepted: string[];
    rejected: string[];
  };
  verified: boolean;
}

export type DiagramIcon =
  | 'globe'
  | 'server'
  | 'queue'
  | 'db'
  | 'bot'
  | 'cron'
  | 'doc'
  | 'bell';

export interface DiagramNode {
  id: string;
  title: string;
  desc: string;
  icon: DiagramIcon;
  color: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface DiagramSpec {
  title: string;
  caption?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  layout: 'pipeline-row' | 'pipeline-rows';
}

export interface ScalingSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  company?: string;
  period: string;
  confidential: boolean;
  heroImage: string;
  summary: string;
  problem: string;
  diagram: DiagramSpec;
  decisions: Decision[];
  metrics: Metric[];
  scalingStory: ScalingSection[];
  deployment?: { description: string; stack: string[]; verified: boolean };
  stack: string[];
  links?: { github?: string; live?: string };
  seoDescription: string;
}

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. EdTech Session Platform
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'edtech-session-platform',
    title: 'EdTech Session Platform',
    tagline: 'The backend behind 10K+ daily tutor-student sessions',
    role: 'Software Developer', // [VERIFY: exact title — site shows both "SDE (AI)" and "Full Stack Developer"]
    company: 'NNIIT',
    period: '2025 — Present', // [VERIFY: exact period]
    confidential: true,
    heroImage: '/project_edtech_platform_1766890051656.png',
    summary:
      'A production backend that schedules, tracks, and follows up on 10K+ daily tutoring sessions — availability matching, rescheduling, automated reminders, and attendance — built on Node.js, MongoDB aggregation pipelines, RabbitMQ, and MSG91.',
    problem:
      'Coordinating thousands of daily tutor-student sessions means constant scheduling churn: availability lookups, reschedules, reminders, and attendance tracking. Doing this synchronously inside API handlers made responses slow and made every notification failure a user-facing error. [VERIFY: describe the actual before-state — what was manual or synchronous before this system?]',
    diagram: {
      title: 'Session & order flow',
      caption: 'Reads served by aggregation pipelines; slow work pushed through the queue.',
      layout: 'pipeline-rows',
      nodes: [
        { id: 'client', title: 'Client Apps', desc: 'Student & tutor portals', icon: 'globe', color: '#0A84FF' },
        { id: 'api', title: 'Node.js API', desc: '60+ REST endpoints', icon: 'server', color: '#BF5AF2' },
        { id: 'mongo', title: 'MongoDB', desc: '$lookup/$facet pipelines', icon: 'db', color: '#32D74B' },
        { id: 'cron', title: 'Cron Scheduler', desc: 'Reminders & attendance', icon: 'cron', color: '#FF9F0A' },
        { id: 'queue', title: 'RabbitMQ', desc: 'Async job queue', icon: 'queue', color: '#FF375F' },
        { id: 'notify', title: 'MSG91', desc: 'SMS/WhatsApp delivery', icon: 'bell', color: '#0A84FF' },
      ],
      edges: [
        { from: 'client', to: 'api' },
        { from: 'api', to: 'mongo' },
        { from: 'cron', to: 'queue', label: 'due jobs' },
        { from: 'queue', to: 'notify', label: 'send' },
        { from: 'api', to: 'queue', dashed: true, label: 'events' },
      ],
    },
    decisions: [
      {
        choice: 'MongoDB aggregation pipelines',
        alternative: 'Application-level joins',
        context: 'Session and order queries needed data from several collections per request.',
        rationale:
          'A single pipeline with an early $match on indexed fields does the join, filter, and shape in one database round trip instead of N sequential queries — the database is simply better at this than the app server. [VERIFY: was this the actual reasoning?]',
        tradeoffs: {
          accepted: [
            'Pipelines are harder to read and debug than app code',
            'Query logic lives in the database layer, so it needs its own tests',
          ],
          rejected: [
            'N+1 query waterfalls per request',
            'Shipping whole collections over the wire to join in memory',
          ],
        },
        verified: false,
      },
      {
        choice: '$facet pagination',
        alternative: 'skip/limit with a second count query',
        context: 'List endpoints needed page data and total counts for the UI.',
        rationale:
          'One $facet stage returns the page of results and the total count in a single query, halving round trips on every list endpoint. [VERIFY]',
        tradeoffs: {
          accepted: ['$facet stages cannot use indexes past the initial $match — needs care on large sets'],
          rejected: ['Two queries per page load', 'Inconsistent counts between the two queries under writes'],
        },
        verified: false,
      },
      {
        choice: 'Dedicated cron scheduler service',
        alternative: 'In-process node-cron inside the API',
        context: 'Reminders and attendance checks must fire on time regardless of API deploys.',
        rationale:
          'Isolating scheduled work from the API process means deploys and crashes of one never silently kill the other, and each scales independently. [VERIFY: was this a separate service or a separate process?]',
        tradeoffs: {
          accepted: ['One more deployable to operate and monitor'],
          rejected: ['Reminder jobs dying with every API restart', 'Schedulers competing with request traffic for CPU'],
        },
        verified: false,
      },
      {
        choice: 'MSG91',
        alternative: 'Twilio / SES',
        context: 'Reminders had to reach Indian students reliably over SMS/WhatsApp.',
        rationale:
          'MSG91 offered better India-region delivery routes and pricing for the volume involved. [VERIFY: were alternatives actually evaluated? If not, reframe as the constraint that led to MSG91]',
        tradeoffs: {
          accepted: ['Regional vendor lock-in for notification templates'],
          rejected: ['Higher per-message cost at 10K+ daily events'],
        },
        verified: false,
      },
    ],
    metrics: [
      {
        label: 'Faster API responses',
        value: '60%',
        numericValue: 60,
        suffix: '%',
        formula:
          'Reduced order/session API latency by ~60% by replacing sequential per-collection queries with single $lookup/$facet aggregation pipelines with early $match on indexed fields. [VERIFY: 60% of what baseline, measured how — p95? average?]',
        verified: false,
      },
      {
        label: 'Daily events processed',
        value: '10K+',
        numericValue: 10,
        suffix: 'K+',
        formula:
          'Session lifecycle events (bookings, reschedules, reminders, attendance) flowing through the platform per day. [VERIFY: source of this count]',
        verified: false,
      },
      {
        label: 'REST APIs shipped',
        value: '60+',
        numericValue: 60,
        suffix: '+',
        formula: 'Endpoints designed, built, and maintained across the session and order domains. [VERIFY count]',
        verified: false,
      },
    ],
    scalingStory: [
      {
        heading: 'Consistency',
        body:
          'Scheduled jobs are the danger zone: a reminder cron that double-fires spams users, one that never fires loses trust. Jobs are made idempotent so re-running a missed or duplicated tick converges to the same state. [VERIFY: how is idempotency actually enforced — job IDs? state checks before send?]',
        bullets: [
          'Session state transitions validated server-side before any notification is queued',
          'Reminder sends keyed to the session so retries cannot duplicate [VERIFY]',
        ],
      },
      {
        heading: 'Scalability',
        body:
          'Schedule lookups are read-heavy and time-window shaped. Compound indexes matching the pipeline\'s $match order keep the hot queries index-covered, and $facet pagination bounds every response. [VERIFY: index specifics]',
        bullets: [
          'Early $match on indexed fields before any $lookup fan-out',
          'Pagination enforced on every list endpoint — no unbounded reads',
        ],
      },
      {
        heading: 'Fault tolerance',
        body:
          'Notification delivery is the least reliable link — a provider outage must not lose reminders. Failed sends are retried through the queue rather than dropped. [TODO: what actually happens when MSG91 is down? Retry policy, alerting, manual replay?]',
      },
    ],
    deployment: {
      description:
        '[TODO: confirm deployment story — Docker images? Which cloud/host? CI pipeline? This section stays hidden until verified.]',
      stack: ['Docker'],
      verified: false,
    },
    stack: ['Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'MSG91', 'Cron'],
    seoDescription:
      'Case study: architecting the backend for 10K+ daily tutoring sessions — MongoDB aggregation pipelines, RabbitMQ async jobs, and automated notifications.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. RabbitMQ Event Pipeline
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'rabbitmq-event-pipeline',
    title: 'Event-Driven Backbone',
    tagline: 'RabbitMQ with dead-letter queues, retries, and consumer scaling',
    role: 'Software Developer', // [VERIFY: exact title]
    company: 'NNIIT',
    period: '2025 — Present', // [VERIFY]
    confidential: true,
    heroImage: '/project_rabbitmq_arch_1766890105265.png',
    summary:
      'The asynchronous nervous system of the platform: an event pipeline that moves 10K+ daily events through RabbitMQ with per-message acknowledgements, TTL + dead-letter retry loops, and horizontally scaled consumers writing to MongoDB and Neo4j.',
    problem:
      'Heavy work — transcript processing, notifications, attendance updates — was coupled to API request handlers. A slow downstream meant slow APIs; a crash mid-task meant lost work. The system needed durable, retryable, observable async processing. [VERIFY before-state]',
    diagram: {
      title: 'Event pipeline with retry loop',
      caption: 'Failed messages dead-letter into a retry queue with TTL backoff instead of hot-looping.',
      layout: 'pipeline-rows',
      nodes: [
        { id: 'producer', title: 'API / Producers', desc: 'Emit domain events', icon: 'server', color: '#0A84FF' },
        { id: 'exchange', title: 'Exchange', desc: 'Routing-key dispatch', icon: 'queue', color: '#BF5AF2' },
        { id: 'queue', title: 'Work Queues', desc: 'Durable, per-domain', icon: 'queue', color: '#FF9F0A' },
        { id: 'workers', title: 'Workers', desc: 'Scaled consumers', icon: 'bot', color: '#32D74B' },
        { id: 'store', title: 'MongoDB / Neo4j', desc: 'State & graph writes', icon: 'db', color: '#0A84FF' },
        { id: 'dlq', title: 'DLQ + Retry', desc: 'TTL backoff loop', icon: 'bell', color: '#FF375F' },
      ],
      edges: [
        { from: 'producer', to: 'exchange' },
        { from: 'exchange', to: 'queue', label: 'routing keys' },
        { from: 'queue', to: 'workers' },
        { from: 'workers', to: 'store' },
        { from: 'queue', to: 'dlq', dashed: true, label: 'nack' },
        { from: 'dlq', to: 'queue', dashed: true, label: 'TTL retry' },
      ],
    },
    decisions: [
      {
        choice: 'RabbitMQ',
        alternative: 'Kafka',
        context: 'The platform needed reliable async task processing at ~10K events/day.',
        rationale:
          'At this scale the problem is task distribution, not stream replay. RabbitMQ gives per-message acknowledgements, built-in TTL/dead-letter exchanges, and priority queues out of the box, with a fraction of Kafka\'s operational surface (no partition planning, no consumer-group rebalancing) for a small team. [VERIFY: does this reflect the real decision?]',
        tradeoffs: {
          accepted: [
            'No replayable event log — once consumed, history is gone',
            'No log compaction or stream-processing ecosystem',
          ],
          rejected: [
            'Operating ZooKeeper/KRaft, partitions, and consumer groups for a workload that never needed them',
            'Paying Kafka\'s complexity tax at 10K events/day when RabbitMQ idles at 100x that',
          ],
        },
        verified: false,
      },
      {
        choice: 'Direct exchange with routing keys',
        alternative: 'Fanout exchange',
        context: 'Different workers care about different event types.',
        rationale:
          'Routing keys let each consumer subscribe to exactly the event types it handles — a transcript worker never sees attendance events. Fanout would broadcast everything to everyone and push filtering into every consumer. [VERIFY: which exchange type was actually used — flip this framing if it was fanout]',
        tradeoffs: {
          accepted: ['Routing-key taxonomy must be designed and documented up front'],
          rejected: ['Every worker paying deserialization cost for events it discards'],
        },
        verified: false,
      },
      {
        choice: 'Manual acks + prefetch tuning',
        alternative: 'Auto-ack',
        context: 'A worker crash mid-task must not lose the message.',
        rationale:
          'Messages are acknowledged only after successful processing, so crashes requeue instead of losing work — at-least-once delivery with idempotent consumers. Prefetch caps how many messages a worker holds, so one slow consumer cannot starve the rest. [VERIFY prefetch values]',
        tradeoffs: {
          accepted: ['Consumers must be idempotent — duplicates are possible by design'],
          rejected: ['Silent message loss on any worker crash (auto-ack acknowledges on delivery)'],
        },
        verified: false,
      },
      {
        choice: 'TTL + dead-letter-exchange retry loop',
        alternative: 'Immediate nack requeue',
        context: 'Failed messages need retries without melting the queue.',
        rationale:
          'Rejected messages dead-letter into a retry queue whose TTL acts as backoff, then re-enter the work queue. Immediate requeue hot-loops poison messages at full speed; the TTL loop gives failing dependencies time to recover. [VERIFY retry counts/TTL values]',
        tradeoffs: {
          accepted: ['More queue topology to understand and monitor'],
          rejected: ['A single poison message consuming a worker at 100% CPU', 'Unbounded instant retries against a down dependency'],
        },
        verified: false,
      },
    ],
    metrics: [
      {
        label: 'Daily events',
        value: '10K+',
        numericValue: 10,
        suffix: 'K+',
        formula: 'Domain events flowing through the exchange per day. [VERIFY source of count]',
        verified: false,
      },
      {
        label: 'Delivery reliability',
        value: '99.9%',
        numericValue: 99.9,
        suffix: '%',
        formula:
          'Message delivery reliability after the DLQ + retry rollout. [VERIFY: how was this measured? If unmeasured, soften to "no message loss observed after DLQ rollout"]',
        verified: false,
      },
    ],
    scalingStory: [
      {
        heading: 'Scalability',
        body:
          'Throughput scales by adding consumers, not by touching producers. Prefetch is the throttle: it bounds per-worker memory and keeps work distribution fair as consumer count changes. [VERIFY: max consumer counts reached]',
        bullets: [
          'Horizontal consumer scaling with zero producer changes',
          'Prefetch tuned per queue to balance latency vs fairness',
        ],
      },
      {
        heading: 'Consistency',
        body:
          'Exactly-once delivery is a myth worth designing around: the pipeline embraces at-least-once and makes consumers idempotent, so a duplicate delivery converges instead of corrupting. [VERIFY: idempotency mechanism — natural keys? dedupe table?]',
      },
      {
        heading: 'Fault tolerance',
        body:
          'Every failure mode has a path: worker crashes requeue via unacked messages, processing failures back off through the TTL/DLX loop, and messages that exhaust retries park in the DLQ for triage instead of vanishing. [TODO: publisher confirms enabled? DLQ alerting/triage process?]',
      },
    ],
    stack: ['RabbitMQ', 'Node.js', 'MongoDB', 'Neo4j', 'Event-Driven'],
    seoDescription:
      'Case study: an event-driven backbone on RabbitMQ — why RabbitMQ over Kafka, direct vs fanout exchanges, manual acks, and TTL dead-letter retry loops.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. AI Transcript Intelligence (the AI/RAG showcase)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-transcript-intelligence',
    title: 'AI Transcript Intelligence',
    tagline: 'A RAG pipeline turning 10K daily sessions into insight',
    role: 'SDE (AI)', // [VERIFY: exact title]
    company: 'NNIIT',
    period: '2025 — Present', // [VERIFY]
    confidential: true,
    heroImage: '/project_transcript_analysis_1766890257445.png',
    summary:
      'An automated pipeline that ingests tutoring-session transcripts, embeds them into a vector store, and runs multi-agent RAG analysis — producing quality reports, sentiment signals, and study material (flashcards) without a human reading a single transcript.',
    problem:
      'At 10K+ sessions a day, no human team can review transcripts. Quality assurance, sentiment tracking, and study-material generation were manual, sampled, and slow. The goal: analyze every session, automatically, at a cost that scales. [VERIFY before-state]',
    diagram: {
      title: 'Transcript → insight pipeline',
      caption: 'Cron-driven ingestion, vector retrieval, multi-agent analysis, automated reporting.',
      layout: 'pipeline-row',
      nodes: [
        { id: 'cron', title: 'Cron Fetcher', desc: 'Pulls new transcripts', icon: 'cron', color: '#FF9F0A' },
        { id: 'queue', title: 'Queue', desc: 'Decouples ingestion', icon: 'queue', color: '#FF375F' },
        { id: 'embed', title: 'Chunk + Embed', desc: 'Chroma vector store', icon: 'db', color: '#32D74B' },
        { id: 'rag', title: 'RAG Agents', desc: 'LangChain + CrewAI + Groq', icon: 'bot', color: '#BF5AF2' },
        { id: 'report', title: 'Reports', desc: 'Insights & flashcards', icon: 'doc', color: '#0A84FF' },
      ],
      edges: [
        { from: 'cron', to: 'queue' },
        { from: 'queue', to: 'embed' },
        { from: 'embed', to: 'rag', label: 'retrieval' },
        { from: 'rag', to: 'report' },
      ],
    },
    decisions: [
      {
        choice: 'RAG (retrieval-augmented generation)',
        alternative: 'Fine-tuning a model',
        context: 'Fresh transcripts arrive daily; analysis must reflect them immediately.',
        rationale:
          'Retrieval keeps the model current with zero training cost — new transcripts are searchable the moment they are embedded. Fine-tuning would need continuous retraining pipelines to chase data that changes every day. [VERIFY]',
        tradeoffs: {
          accepted: ['Per-query token overhead from retrieved context', 'Retrieval quality becomes a system dependency'],
          rejected: ['Recurring fine-tune cost and drift', 'Days-stale model knowledge'],
        },
        verified: false,
      },
      {
        choice: 'CrewAI multi-agent decomposition',
        alternative: 'One mega-prompt',
        context: 'Each transcript needs extraction, analysis, and report generation.',
        rationale:
          'Separate agent roles (extractor → analyst → reporter) keep each prompt small, testable, and independently improvable. A mega-prompt entangles every concern — one wording change shifts all outputs. [VERIFY]',
        tradeoffs: {
          accepted: ['Orchestration overhead and multiple LLM calls per transcript'],
          rejected: ['Un-debuggable single prompts', 'All-or-nothing output quality'],
        },
        verified: false,
      },
      {
        choice: 'Groq for inference',
        alternative: 'OpenAI',
        context: 'Thousands of transcripts a day makes per-call latency and cost dominant.',
        rationale:
          'Groq\'s inference speed and pricing fit a high-volume batch pipeline where each transcript triggers multiple agent calls. [VERIFY: which provider actually served this pipeline — the stack lists OpenAI, Gemini, and Groq]',
        tradeoffs: {
          accepted: ['Smaller model selection than OpenAI'],
          rejected: ['Higher per-token cost multiplied across every agent call'],
        },
        verified: false,
      },
      {
        choice: 'Chroma vector store',
        alternative: 'pgvector / Atlas Vector Search',
        context: 'Embedded transcript chunks need fast similarity search.',
        rationale:
          'Chroma is embedding-native and trivial to stand up inside a Python pipeline — no schema migrations or cluster upgrades to start shipping. [VERIFY: was Chroma the store used in production?]',
        tradeoffs: {
          accepted: ['A separate store to operate alongside MongoDB'],
          rejected: ['Coupling vector search availability to the primary database'],
        },
        verified: false,
      },
    ],
    metrics: [
      {
        label: 'Transcripts analyzed daily',
        value: '10K+',
        numericValue: 10,
        suffix: 'K+',
        formula: '[TODO: real transcripts-per-day number — sessions and transcripts may differ]',
        verified: false,
      },
      {
        label: 'Manual review replaced',
        value: '100%',
        numericValue: 100,
        suffix: '%',
        formula:
          'Every session is analyzed automatically vs the previous sampled manual review. [TODO: turnaround before vs after, cost per transcript — likely the most impressive numbers if available]',
        verified: false,
      },
    ],
    scalingStory: [
      {
        heading: 'Fault tolerance',
        body:
          'LLM calls fail in ways databases never do: timeouts, rate limits, and syntactically-valid nonsense. Calls retry with backoff, and outputs are validated against expected structure before anything downstream consumes them. [VERIFY: what happens on malformed output — retry, skip, flag?]',
        bullets: [
          'Retry with backoff on provider rate limits',
          'Structured-output validation before reports are persisted [VERIFY]',
        ],
      },
      {
        heading: 'Consistency',
        body:
          'Reprocessing a transcript (after a failure or pipeline improvement) is idempotent — embeddings and reports are keyed to the session, so re-runs overwrite rather than duplicate. [VERIFY]',
      },
      {
        heading: 'Quality',
        body:
          '[TODO: how were outputs evaluated? Even "manual spot-check rubric against N transcripts per week" is credible and worth stating.]',
      },
    ],
    stack: ['Python', 'LangChain', 'CrewAI', 'Groq', 'RAG', 'Chroma', 'Cron'],
    seoDescription:
      'Case study: a RAG pipeline over daily tutoring transcripts — RAG vs fine-tuning, CrewAI multi-agent design, Groq inference, and Chroma retrieval.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Wizard Vibe (public code)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'wizard-vibe',
    title: 'Wizard Vibe',
    tagline: 'An agentic productivity assistant with real-time collaboration',
    role: 'Creator',
    period: '2024', // [VERIFY: when was this built?]
    confidential: false,
    heroImage: '/project_wizard_vibe_1766892242642.png',
    summary:
      'A personal project exploring what a productivity assistant looks like when it is agents all the way down: CrewAI workflows do the thinking, Gemini does the reasoning, and Socket.IO streams agent progress live to every collaborator in the room. The code is public.',
    problem:
      'Most AI productivity tools are a chat box: you ask, you wait, you get a wall of text. The experiment: make agent workflows first-class — visible, interruptible, and shared in real time between collaborating users. [VERIFY intent]',
    diagram: {
      title: 'Real-time agent loop',
      layout: 'pipeline-row',
      nodes: [
        { id: 'client', title: 'Next.js Client', desc: 'Collaborative rooms', icon: 'globe', color: '#0A84FF' },
        { id: 'socket', title: 'Socket.IO', desc: 'Bidirectional stream', icon: 'server', color: '#FF9F0A' },
        { id: 'crew', title: 'CrewAI', desc: 'Agent orchestration', icon: 'bot', color: '#BF5AF2' },
        { id: 'llm', title: 'Gemini', desc: 'Reasoning engine', icon: 'bot', color: '#32D74B' },
      ],
      edges: [
        { from: 'client', to: 'socket' },
        { from: 'socket', to: 'crew', label: 'tasks' },
        { from: 'crew', to: 'llm' },
        { from: 'llm', to: 'socket', dashed: true, label: 'progress' },
      ],
    },
    decisions: [
      {
        choice: 'Socket.IO',
        alternative: 'SSE / polling',
        context: 'Agent progress must stream to users, and users must be able to interrupt agents.',
        rationale:
          'The interaction is bidirectional — agents push progress down while users push interruptions and new context up — and rooms give collaboration for free. SSE only covers the downstream half. [VERIFY]',
        tradeoffs: {
          accepted: ['Stateful connections complicate horizontal scaling'],
          rejected: ['Poll-lag between an agent finishing and users seeing it', 'A second channel just for user interrupts'],
        },
        verified: false,
      },
      {
        choice: 'CrewAI',
        alternative: 'Hand-rolled agent loop',
        context: 'Multiple agent roles needed orchestration with task hand-offs.',
        rationale:
          'Declarative role/task definitions made iterating on agent behavior a config change rather than a refactor. Building the loop by hand teaches more but ships less. [VERIFY]',
        tradeoffs: {
          accepted: ['Framework lock-in and its abstractions'],
          rejected: ['Reinventing task routing, memory, and retries'],
        },
        verified: false,
      },
      {
        choice: 'Gemini',
        alternative: 'OpenAI / local models',
        context: 'A personal project needs capable reasoning on a personal budget.',
        rationale:
          'Gemini\'s free-tier economics and long context made it the pragmatic choice for a self-funded experiment. [VERIFY]',
        tradeoffs: {
          accepted: ['Provider-specific prompt tuning'],
          rejected: ['Paying per-token for an experiment', 'Local-model quality ceilings'],
        },
        verified: false,
      },
    ],
    // Personal project: architecture-level, not traffic-level — the template renders no metrics row
    metrics: [],
    scalingStory: [
      {
        heading: 'Honest framing',
        body:
          'This is a personal project: its numbers are architecture decisions, not traffic. What it demonstrates is the shape of a production system — event streaming, agent orchestration, room-based state — at hobby scale, with code you can actually read.',
      },
    ],
    deployment: {
      description: '[TODO: deployment story from the repo README — Vercel? Docker compose?]',
      stack: [],
      verified: false,
    },
    stack: ['Next.js', 'Socket.IO', 'CrewAI', 'Gemini', 'Node.js'],
    links: { github: 'https://github.com/bitwizard25/Wizard-Vibe' },
    seoDescription:
      'Case study: Wizard Vibe — an agentic productivity assistant with CrewAI workflows, Gemini reasoning, and Socket.IO real-time collaboration. Public code.',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
