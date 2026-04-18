export interface Skill {
  name: string;
}

export interface SkillTrack {
  id: string;
  category: string;
  color: string;
  skills: Skill[];
}

export const skillTracks: SkillTrack[] = [
  {
    id: "track-1",
    category: "Backend",
    color: "#E8E8F0", // Primary Text / Whiteish
    skills: [
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "Supabase" },
      { name: "Node.js" },
      { name: "Microservices Architecture" },
      { name: "Django" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
    ],
  },
  {
    id: "track-2",
    category: "Frontend",
    color: "#7F77DD", // Accent Purple
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "TypeScript" },
      { name: "REST API Integration" },
      { name: "Responsive Design" },
      { name: "HTML5 / CSS3" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "track-3",
    category: "AI / Data",
    color: "#1D9E75", // AI Green
    skills: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Scikit-learn" },
      { name: "RAG" },
      { name: "PyTorch" },
      { name: "Vector Databases" },
      { name: "TensorFlow" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Data Visualization" },
    ],
  },
  {
    id: "track-4",
    category: "Automation / Agentic AI & DevOps",
    color: "#EF9F27", // Amber
    skills: [
      { name: "Agentic AI" },
      { name: "LangChain" },
      { name: "n8n" },
      { name: "OpenAI API" },
      { name: "Docker" },
      { name: "Cloud Deployment" },
      { name: "CI/CD" },
    ],
  },
];
