"use client";

import { motion } from "framer-motion";

type Props = {
  frontend: string;
  services: string[];
  cache: string;
  databases: string[];
  search?: string;
};

export default function ArchitectureDiagram({
  frontend,
  services,
  cache,
  databases,
  search,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-2xl p-6 md:p-10 relative overflow-hidden"
    >
      <h4 className="font-semibold text-lg mb-8">
        Arquitetura do Sistema
      </h4>

      {/* FRONTEND */}
      <Block text={frontend} color="blue" />

      {/* LINHA */}
      <Line />

      {/* SERVICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <Block key={s} text={s} color="purple" />
        ))}
      </div>

      <Line />

      {/* CACHE */}
      <Block text={cache} color="green" />

      <Line />

      {/* DATABASES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {databases.map((db) => (
          <Block key={db} text={db} color="blue" />
        ))}
      </div>

      {search && (
        <>
          <Line />
          <Block text={search} color="green" />
        </>
      )}
    </motion.div>
  );
}

/* COMPONENTES AUXILIARES */

function Line() {
  return (
    <>
      {/* vertical line for md and up */}
      <div className="hidden md:flex justify-center my-6">
        <div className="w-px h-8 bg-gray-200" />
      </div>

      {/* horizontal separator for small screens */}
      <div className="flex md:hidden my-4">
        <div className="w-full h-px bg-gray-200" />
      </div>
    </>
  );
}

function Block({
  text,
  color,
}: {
  text: string;
  color: "blue" | "purple" | "green";
}) {
  const styles = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-primarySoft border-primary/30 text-primary",
    green: "bg-greenSoft border-emerald-200 text-emerald-700",
  };

  return (
    <div
      className={`border rounded-xl px-4 py-4 md:px-6 md:py-4 text-center font-medium text-sm md:text-base min-h-[56px] md:min-h-[64px] flex items-center justify-center transition-transform duration-150 ease-out hover:shadow-sm hover:-translate-y-1 ${styles[color]}`}
    >
      {text}
    </div>
  );
}
