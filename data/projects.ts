export interface Project {
  id: string;
  title: string;
  problem: string;
  impact: string;
  type: "web" | "ai-ml" | "data" | "automation";
  tags: string[];
  featured: boolean;
  color: string;
  imageUrl: string; // Added image field
  liveUrl: string | null;
  githubUrl: string | null;
}

export const projects: Project[] = [
  {
    id: "p1",
    featured: true,
    type: "web",
    title: "SaaS Dashboard",
    problem: "Client needed a real-time analytics dashboard for their SaaS product",
    impact: "↑ 60% user engagement · 3k+ active users",
    color: "#7F77DD",
    imageUrl: "/projects/p1.png",
    tags: ["Next.js", "Tailwind CSS", "Recharts"],
    liveUrl: "https://example.com/saas",
    githubUrl: "https://github.com/example/saas-dashboard",
  },
  {
    id: "p2",
    featured: false,
    type: "ai-ml",
    title: "Sentiment Analysis API",
    problem: "NLP model to classify customer feedback at scale",
    impact: "92% accuracy · 10k requests/day",
    color: "#1D9E75",
    imageUrl: "/projects/p2.png",
    tags: ["Python", "FastAPI", "Transformers"],
    liveUrl: "https://example.com/sentiment",
    githubUrl: "https://github.com/example/sentiment-api",
  },
  {
    id: "p3",
    featured: false,
    type: "data",
    title: "Market Trend Visualizer",
    problem: "Interactive D3 dashboard for stock market pattern analysis",
    impact: "Used by 500+ traders · 40ms render time",
    color: "#EF9F27",
    imageUrl: "/projects/p3.png",
    tags: ["React", "D3.js", "Node.js"],
    liveUrl: "https://example.com/market",
    githubUrl: "https://github.com/example/market-visualizer",
  },
  {
    id: "p4",
    featured: false,
    type: "automation",
    title: "Lead Enrichment Pipeline",
    problem: "Automated n8n workflow for CRM data enrichment using LLMs",
    impact: "Saves 15hr/week · 98% accuracy",
    color: "#7F77DD",
    imageUrl: "/projects/p4.png",
    tags: ["n8n", "OpenAI API", "HubSpot"],
    liveUrl: null,
    githubUrl: "https://github.com/example/lead-pipeline",
  },
  {
    id: "p5",
    featured: false,
    type: "ai-ml",
    title: "RAG Knowledge Base",
    problem: "LangChain-powered document Q&A system for enterprise clients",
    impact: "Sub-2s responses · 10k document corpus",
    color: "#1D9E75",
    imageUrl: "/projects/p5.png",
    tags: ["Python", "LangChain", "Pinecone"],
    liveUrl: "https://example.com/rag",
    githubUrl: "https://github.com/example/rag-kb",
  },
];
