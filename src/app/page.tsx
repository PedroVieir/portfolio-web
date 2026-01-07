import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col gap-28 md:gap-36">

      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
