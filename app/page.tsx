import dynamic from "next/dynamic";
import Nav from "@/components/nav/Nav";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });

// AI Lab dynamic import with skeleton
const AILab = dynamic(() => import("@/components/sections/AILab"), {
  loading: () => (
    <div className="w-full flex items-center justify-center p-32 bg-base min-h-[600px]">
      <div className="w-[600px] h-[400px] border border-border-custom bg-surface rounded-xl animate-pulse" />
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <AILab />
      <Contact />
      <Footer />
    </main>
  );
}
