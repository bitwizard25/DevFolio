// Project data — single source of truth for the cards on / and /projects.
// Icons are string keys (kept server-safe/serializable); components map them to lucide icons.

export type ProjectIcon = 'server' | 'database' | 'bot' | 'git-branch' | 'trending' | 'users';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  link?: string;
  github?: string;
  tags: string[];
  featured?: boolean;
  icon: ProjectIcon;
  metrics?: string;
  category: 'office' | 'personal';
  company?: string;
  /** Links the card to its deep-dive page at /projects/[slug] */
  caseStudySlug?: string;
}

export const projects: Project[] = [
  // Office Projects (NNIIT)
  {
    id: 1,
    title: "EdTech Session Management",
    description: "Production-grade backend managing 10K+ daily tutor-student sessions with automated scheduling.",
    longDescription: "Built comprehensive session management system with MongoDB aggregations, RabbitMQ queues, and automated notifications via MSG91.",
    image: "/project_edtech_platform_1766890051656.png",
    tags: ["Node.js", "MongoDB", "RabbitMQ", "MSG91", "Cron"],
    featured: true,
    icon: 'server',
    metrics: "10K+ events/day",
    category: 'office',
    company: 'NNIIT',
    caseStudySlug: 'edtech-session-platform',
  },
  {
    id: 2,
    title: "Order Management API",
    description: "High-performance REST API with MongoDB aggregation pipelines, 60% faster response times.",
    longDescription: "Optimized order management using $lookup, $facet for pagination and dynamic search with relevance scoring.",
    image: "/project_api_data_1766890087589.png",
    tags: ["Node.js", "MongoDB", "REST API", "Aggregation"],
    featured: true,
    icon: 'database',
    metrics: "60% faster",
    category: 'office',
    company: 'NNIIT',
    caseStudySlug: 'edtech-session-platform',
  },
  {
    id: 4,
    title: "AI Assistant with CrewAI",
    description: "Multi-agent AI system using CrewAI, Groq LLM, and LangChain for intelligent automation.",
    longDescription: "Developed AI assistant leveraging CrewAI for multi-agent orchestration with chain-of-thought reasoning.",
    image: "/project_ai_agents_1766890069336.png",
    tags: ["Python", "LangChain", "CrewAI", "Groq"],
    featured: true,
    icon: 'bot',
    category: 'office',
    company: 'NNIIT',
    caseStudySlug: 'ai-transcript-intelligence',
  },
  {
    id: 5,
    title: "RabbitMQ Architecture",
    description: "Enterprise-grade message queue with dead-letter queues, retries, and consumer scaling.",
    longDescription: "Redesigned RabbitMQ implementation following best practices for reliable event-driven architecture.",
    image: "/project_rabbitmq_arch_1766890105265.png",
    tags: ["RabbitMQ", "Node.js", "Event-Driven"],
    featured: false,
    icon: 'git-branch',
    category: 'office',
    company: 'NNIIT',
    caseStudySlug: 'rabbitmq-event-pipeline',
  },
  {
    id: 6,
    title: "Transcript Analysis Pipeline",
    description: "Automated AI-powered pipeline for session transcript analysis and insight generation.",
    longDescription: "End-to-end pipeline with cron jobs for fetching, RAG-based analysis, and automated reporting.",
    image: "/project_transcript_analysis_1766890257445.png",
    tags: ["Python", "RAG", "LLM", "Cron"],
    featured: false,
    icon: 'trending',
    category: 'office',
    company: 'NNIIT',
    caseStudySlug: 'ai-transcript-intelligence',
  },

  // Personal Projects
  {
    id: 101,
    title: "Lok Darpan",
    description: "A digital platform reflecting social dynamics and civic engagement. Built with Next.js.",
    longDescription: "Built a comprehensive full-stack application (Next.js) to facilitate transparency and digital civic engagement.",
    image: "/project_lok_darpan_1766892221259.png",
    link: "https://github.com/bitwizard25/LokDarpan",
    github: "https://github.com/bitwizard25/LokDarpan",
    tags: ["Next.js", "Node.js", "MongoDB", "Social"],
    featured: true,
    icon: 'users',
    category: 'personal',
  },
  {
    id: 102,
    title: "Wizard Vibe",
    description: "Agentic AI productivity assistant with real-time collaboration and CrewAI workflows.",
    longDescription: "Developed an intelligent assistant using Gemini, CrewAI, and Socket.IO for real-time features and agentic automation.",
    image: "/project_wizard_vibe_1766892242642.png",
    link: "https://github.com/bitwizard25/Wizard-Vibe",
    github: "https://github.com/bitwizard25/Wizard-Vibe",
    tags: ["Gemini", "CrewAI", "Socket.IO", "Next.js"],
    featured: true,
    icon: 'bot',
    category: 'personal',
    caseStudySlug: 'wizard-vibe',
  },
  {
    id: 103,
    title: "Expense Tracker",
    description: "Full-stack financial dashboard for tracking expenses with data visualization.",
    longDescription: "created a personal finance management tool with interactive charts and secure transactions processing.",
    image: "/project_expense_tracker_1766892258626.png",
    link: "https://github.com/bitwizard25",
    github: "https://github.com/bitwizard25",
    tags: ["Next.js", "Charts.js", "Finance", "Node.js"],
    featured: true,
    icon: 'database',
    category: 'personal',
  },
];
