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
    category: "Front-end",
    color: "#7F77DD", // Accent Purple
    skills: [
      { name: "React" },
      { name: "Next.js 14" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Three.js / R3F" },
      { name: "Redux Toolkit" },
      { name: "HTML5 / CSS3" },
      { name: "GSAP" },
    ],
  },
  {
    id: "track-2",
    category: "Backend",
    color: "#E8E8F0", // Primary Text / Whiteish
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "Redis" },
    ],
  },
  {
    id: "track-3",
    category: "AI / Data",
    color: "#1D9E75", // AI Green
    skills: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Scikit-Learn" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Hugging Face" },
      { name: "Data Visualization" },
      { name: "Jupyter" },
      { name: "Vector Databases" },
    ],
  },
  {
    id: "track-4",
    category: "Automation / Agentic AI & DevOps",
    color: "#EF9F27", // Amber
    skills: [
      { name: "n8n" },
      { name: "LangChain" },
      { name: "OpenAI API" },
      { name: "Agentic Workflows" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "CI/CD" },
      { name: "Linux" },
      { name: "GitHub Actions" },
    ],
  },
];
