export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  problem: string;      // Used for card description
  impact: string;       // Used for card hover
  type: "web" | "ai-ml" | "data" | "automation";
  tags: string[];
  featured: boolean;
  color: string;
  imageUrl: string; 
  
  // Modal specifically detailed data
  role: string;         // e.g. "Solo project · 6 weeks · 2024"
  whatItDoes: string;
  keyChallenge?: string;
  metrics: ProjectMetric[]; // exactly 3 metrics per project
  
  // Links
  liveUrl: string | null;
  githubUrl: string | null;
  videoUrl: string | null;
  linkedinUrl: string | null;
}

export const projects: Project[] = [
  {
    id: "p1",
    featured: true,
    type: "web",
    title: "EduAi – AI Voice Learning SaaS",
    problem: "Learning is mostly passive (videos/courses) and lacks real-time interaction and personalization.",
    impact: "Interactive AI tutor with real-time voice conversations.",
    color: "#6366F1",
    imageUrl: "/images/projects/eduai-preview.png",
    tags: ["Next.js", "Supabase", "Clerk", "Vapi", "AI Agents", "Voice AI"],
    role: "Solo Project · 4+ weeks · 2026",
    whatItDoes: "EduAi is an AI-powered learning platform that allows users to create and interact with voice-based AI companions acting as personal tutors. Each companion is built around a specific domain and topic, enabling real-time, natural conversations where users can ask questions, receive explanations, and learn interactively. The platform includes a public library of shared companions, session tracking, and a subscription-based system that controls access and usage.",
    keyChallenge: "Integrating low-latency voice AI while maintaining state across conversational turns was the primary technical hurdle, solved through efficient balancing of Vapi's real-time engine with backend session management.",
    metrics: [
      { label: "AI Interaction", value: "Real-time Voice" },
      { label: "Architecture", value: "Full-stack SaaS" },
      { label: "Scalability", value: "Multi-user System" }
    ],
    liveUrl: "https://eduaiapp-phi.vercel.app",
    githubUrl: "https://github.com/MesterAB21/Saas-App",
    videoUrl: null,
    linkedinUrl: "https://www.linkedin.com/posts/abderrahmane-hamaidi-7666073b7_saas-conversationalai-edtech-activity-7447709885561225216-lOP2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGW3K34BQE7mk5ThULxnuod-zu22eFCJbnA"
  },
  
  {
  id: "p1-takaful",
  featured: true,
  type: "web",
  title: "Takaful — Local Service Exchange Ecosystem",

  problem: "Communities lack structured systems to coordinate and exchange local services without relying on external aid.",

  impact: "🏆 Best Idea @ Hakin 8.0",

  color: "#6366F1",
  imageUrl: "/images/projects/Capture d'écran 2026-03-20 002824.png",

  tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],

  // Modal Detailed Data
  role: "Backend Developer · Team Expedition · Hackathon Project",

  whatItDoes: "Takaful is a platform that creates a local ecosystem where people exchange services using a point-based system. Users can offer services like construction, medical services, tutoring, plumbing, and housekeeping, and earn points in return. These points can then be used to request services from others, creating a self-sustained loop of value exchange. I built the backend, designing APIs, managing the database, and implementing the core logic including the point system and notifications. The platform focuses on enabling real collaboration inside communities without relying on external support.",

  metrics: [
    { label: "Award", value: "Best Idea 🏆" },
    { label: "Architecture", value: "REST APIs" },
    { label: "System", value: "Point-based Economy" }
  ],

  keyChallenge: "Scaling the matching algorithm to handle real-time service requests while maintaining a fair point-based economy was the technical focus.",
  liveUrl: "https://takaful-five.vercel.app/",
  githubUrl: "https://github.com/hanisersa/takaful",
  videoUrl: null,
  linkedinUrl: "https://www.linkedin.com/posts/abderrahmane-hamaidi-7666073b7_hackathon-webdevelopment-nextjs-ugcPost-7440548471436132352-Vx8b?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGW3K34BQE7mk5ThULxnuod-zu22eFCJbnA"
},
{
  id: "p67",
  featured: true,
  type: "automation",
  title: "AI Voice Assistant for Dental Clinics",
  problem: "Dental clinics lose patients and revenue due to missed calls and manual booking limitations.",
  impact: "Captures missed calls → +30% booking potential",
  color: "#8B5CF6",
  imageUrl: "/images/projects/dental-ai-simple.png",
  tags: ["n8n", "Vapi AI", "ElevenLabs", "Automation", "AI Agents", "Voice AI"],

  role: "Solo Project · 3-4 weeks · 2026",

  whatItDoes: "Built a fully autonomous AI voice assistant designed for dental clinics to handle real patient calls end-to-end. The system answers calls 24/7, checks real-time calendar availability, and books, reschedules, or cancels appointments with natural voice interaction. It intelligently detects if a caller already has an existing appointment and offers relevant actions like confirmation or cancellation. The assistant integrates with Google Calendar and uses structured tool-calling logic to ensure accurate scheduling, prevent double bookings, and maintain consistent workflows. Designed to replicate a real receptionist while improving efficiency and availability.",

  metrics: [
    { label: "Availability", value: "24/7" },
    { label: "Call Handling", value: "100%" },
    { label: "Booking Accuracy", value: "99%" }
  ],

  liveUrl: null,
  githubUrl: null,
  videoUrl: "https://www.loom.com/share/0e5f2baeabef4be3a05da008817f5a01",
  linkedinUrl: "https://www.linkedin.com/posts/abderrahmane-hamaidi-7666073b7_aiprojects-voiceassistant-automation-ugcPost-7442757097437528064-c5QP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGW3K34BQE7mk5ThULxnuod-zu22eFCJbnA"
},
  {
    id: "p2",
    featured: false,
    type: "ai-ml",
    title: "Sentiment Analysis API",
    problem: "NLP model to classify customer feedback at scale.",
    impact: "94% accuracy · 10k requests/day",
    color: "#10B981",
    imageUrl: "/projects/p2.png",
    tags: ["Python", "FastAPI", "Transformers", "PyTorch"],
    role: "Machine Learning Engineer · 4 weeks · 2023",
    whatItDoes: "A highly scalable API service designed to automatically process and classify incoming customer support tickets and product reviews. It categorizes feedback by sentiment (positive, neutral, negative) and automatically routes critical tickets to the appropriate human agents, drastically reducing response times.",
    keyChallenge: "Deploying the Transformer model in an affordable and scalable way was difficult, as GPU instances are expensive. I optimized the model using quantization techniques, reducing the memory footprint by 4x. This allowed it to run efficiently on standard CPU instances while maintaining 94% inference accuracy.",
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Latency", value: "45ms" },
      { label: "Reqs/Day", value: "10k+" }
    ],
    liveUrl: "https://example.com/sentiment",
    githubUrl: "https://github.com/example/sentiment-api",
    videoUrl: null,
    linkedinUrl: null
  },
  {
    id: "p3",
    featured: false,
    type: "data",
    title: "Market Trend Visualizer",
    problem: "Interactive D3 dashboard for stock market pattern analysis.",
    impact: "Used by 500+ traders · 40ms render time",
    color: "#F59E0B",
    imageUrl: "/projects/p3.png",
    tags: ["React", "D3.js", "Node.js", "Redis"],
    role: "Solo Project · 3 weeks · 2023",
    whatItDoes: "A web-based financial visualization tool that tracks stock market anomalies in real-time. It maps thousands of data points into an interactive node-and-link graph, allowing traders to visually identify correlations and trends that are normally hidden within raw numerical tables.",
    keyChallenge: "Rendering over a million DOM elements natively consistently crashed the browser. The solution was migrating the core visualization logic from SVG to WebGL using PIXI.js, which resulted in a buttery smooth 60fps experience even on lower-end devices.",
    metrics: [
      { label: "Traders", value: "500+" },
      { label: "Render", value: "40ms" },
      { label: "Data points", value: "1M+" }
    ],
    liveUrl: "https://example.com/market",
    githubUrl: "https://github.com/example/market-visualizer",
    videoUrl: null,
    linkedinUrl: "https://linkedin.com/post/example"
  },
 
    
  
];
