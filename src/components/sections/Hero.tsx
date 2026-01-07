"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";
import Badge from "../ui/Badge";

export default function Hero() {
  return (
    <section className="pt-12 pb-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary">
            Pedro Vieira
          </h1>

          <h2 className="text-lg md:text-xl font-semibold text-textPrimary">
            Desenvolvedor Full Stack
          </h2>

          <p className="max-w-2xl text-sm md:text-base text-textSecondary">
            Desenvolvedor em formação, focado em criar soluções web modernas,
            automações de processos e integrações eficientes com JavaScript,
            Node.js e React.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <Badge text="JavaScript" color="blue" />
            <Badge text="React & Next.js" color="purple"/>
            <Badge text="Node.js" color="green" />
            <Badge text="SQL" color="blue" />
            <Badge text="Automação" color="blue" />

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
