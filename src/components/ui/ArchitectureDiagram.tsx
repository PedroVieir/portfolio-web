"use client";

import { motion } from "framer-motion";

type Props = {
  frontend: string;
  services: string[];
  cache: string;
  databases: string[];
  search?: string;
  compact?: boolean;
};

export default function ArchitectureDiagram({
  frontend,
  services,
  cache,
  databases,
  search,
  compact,
}: Props) {
  const outerClass = compact
    ? "bg-gray-50 rounded-lg p-3 md:p-4 relative overflow-hidden dark:bg-[#0f1724]"
    : "bg-gray-50 rounded-2xl p-6 md:p-10 relative overflow-hidden dark:bg-[#0f1724]";

  const titleClass = compact ? "font-semibold text-xs md:text-sm mb-3" : "font-semibold text-lg mb-8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={outerClass}
    >
      <h4 className={titleClass}>Arquitetura do Sistema</h4>

      {/* FRONTEND */}
      <Block text={frontend} color="blue" />

      {/* LINHA */}
      <Line />

      {/* SERVICES */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-6'}`}>
        {services.map((s) => (
          <Block key={s} text={s} color="purple" />
        ))}
      </div>

      <Line />

      {/* CACHE */}
      <Block text={cache} color="green" />

      <Line />

      {/* DATABASES */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-6'}`}>
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
      <div className="hidden md:flex justify-center my-4">
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-600" />
          </div>

      {/* horizontal separator for small screens */}
      <div className="flex md:hidden my-2">
        <div className="w-full h-px bg-gray-200 dark:bg-gray-600" />
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
    blue: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200",
    purple: "bg-primarySoft border-primary/30 text-primary dark:bg-[#1f2330] dark:border-primary/30 dark:text-primary",
    green: "bg-greenSoft border-emerald-200 text-emerald-700 dark:bg-emerald-900 dark:border-emerald-800 dark:text-emerald-300",
  };

  return (
    <div
      className={`border rounded-lg px-2 py-2 md:px-3 md:py-2 text-center font-medium text-xs md:text-sm min-h-[40px] md:min-h-[44px] flex items-center justify-center transition-transform duration-150 ease-out hover:shadow-sm hover:-translate-y-1 ${styles[color]}`}
    >
      {text}
    </div>
  );
}
