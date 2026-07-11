// Bookshelf data — single source of truth for the bookshelf section on the about page.
// Takeaways confirmed as final content.

export interface Book {
  id: number;
  title: string;
  author: string;
  takeaway: string;
  color: string; // Tailwind/CSS color theme for the spine gradient
  verified: boolean;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    takeaway: "Idempotent consumers, write-ahead logs, and schema evolution are the foundation of building robust, fault-tolerant distributed pipelines.",
    color: "from-blue-600/40 to-cyan-500/30 border-blue-500/30",
    verified: true,
  },
  {
    id: 2,
    title: "System Design Interview",
    author: "Alex Xu",
    takeaway: "Back-of-the-envelope estimations, capacity calculations, and partitioning strategies help identify architectural bottlenecks before writing code.",
    color: "from-purple-600/40 to-pink-500/30 border-purple-500/30",
    verified: true,
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    takeaway: "Tracer bullets, decoupled architectures, and dry codebases allow software teams to adapt quickly to changing business requirements.",
    color: "from-amber-600/40 to-orange-500/30 border-orange-500/30",
    verified: true,
  },
  {
    id: 4,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    takeaway: "Business rules should be isolated from database drivers, frameworks, and message brokers, keeping dependencies pointing inward.",
    color: "from-emerald-600/40 to-teal-500/30 border-emerald-500/30",
    verified: true,
  },
];
