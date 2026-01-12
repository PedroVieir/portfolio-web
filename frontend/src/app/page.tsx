import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">

      {/* First screen: Hero + Skills together */}
      <div className="snap-start min-h-screen flex flex-col justify-center">
        <Hero />
        <Skills />
      </div>

      {/* Projects occupies full viewport and snaps into view */}
      <div className="snap-start">
        <Projects />
      </div>

      {/* Contact as next snap */}
      <div className="snap-start">
        <Contact />
      </div>
    </main>
  );
}
