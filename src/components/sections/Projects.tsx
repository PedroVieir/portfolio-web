"use client";

import { motion } from "framer-motion";
import { hoverLift, fadeUp } from "@/lib/motion";
import Container from "../layout/Container";
import { projects } from "@/data/projects";

/**
 * Projects Section
 * Modern card-based showcase with better UX
 */
export default function Projects() {
  return (
    <section id="projects" className="py-5 md:py-24 bg-white dark:bg-black" aria-label="Projects section">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true }}
          transition={fadeUp.transition}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 dark:text-white">Projetos</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-gray-300">Conheça alguns dos projetos que desenvolvi, com foco em qualidade, inovação e melhor experiência do usuário.</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Card Container */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200/50 hover:border-primary/20 dark:bg-black dark:border-gray-700/40 dark:text-white">
                {/* Header with accent */}
                <div className="h-2 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  {/* Title and Badge */}
                  <div className="mb-4">
                    <h3
                      id={`project-${project.id}`}
                      className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 mb-2"
                    >
                      {project.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full dark:bg-blue-800 dark:text-blue-300">Frontend</span>
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full dark:bg-purple-800 dark:text-purple-300">Backend</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5 flex-grow dark:text-gray-300">
                    {project.description}
                  </p>

                  {/* Tech Stacks */}
                  <div className="space-y-4 mb-6">
                    {/* Frontend */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs">→</span>
                        Frontend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.frontend.map((tech) => (
                          <span key={tech} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 dark:bg-[#0f1724] dark:text-gray-200 dark:hover:bg-blue-900">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Backend */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs">→</span>
                        Backend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.backend.map((tech) => (
                          <span key={tech} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200 dark:bg-[#0f1724] dark:text-gray-200 dark:hover:bg-purple-900">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs">✓</span>
                      Resultados
                    </h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm text-gray-600 flex gap-2 dark:text-gray-300">
                          <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-6 md:px-8 pb-6 pt-4 border-t border-gray-200/50 bg-gray-50/30 dark:bg-black/95 dark:border-gray-700/40">
                  <button className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
