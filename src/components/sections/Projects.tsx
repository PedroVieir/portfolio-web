"use client";

import { motion } from "framer-motion";
import { hoverLift } from "@/lib/motion";
import Container from "../layout/Container";
import ArchitectureDiagram from "../ui/ArchitectureDiagram";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Projetos
          </h2>
        </motion.div>

        {projects.map((project) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={hoverLift}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-soft border border-gray-100 p-12 md:p-20"
            aria-labelledby={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* ESQUERDA */}
              <div>
                <h3 id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-3xl md:text-4xl font-bold mb-8">
                  {project.title}
                </h3>

                <p className="text-base md:text-lg leading-relaxed max-w-xl mb-14">
                  {project.description}
                </p>

                <Section
                  title="Frontend"
                  color="blue"
                  items={project.frontend}
                />

                <Section
                  title="Backend"
                  color="purple"
                  items={project.backend}
                />

                <Section
                  title="Principais Resultados"
                  color="green"
                  items={project.achievements}
                />
              </div>

              {/* DIREITA */}
              <ArchitectureDiagram {...project.architecture} />
            </div>
          </motion.article>
        ))}
      </Container>
    </section>
  );
}

function Section({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "blue" | "purple" | "green";
}) {
  const titleColor = {
    blue: "text-blue-600",
    purple: "text-primary",
    green: "text-emerald-600",
  };

  return (
    <div className="mb-14">
      <h4 className="text-lg font-semibold mb-5">

        {title}
      </h4>
      <ul className="space-y-4 text-base leading-relaxed">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
