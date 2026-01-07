"use client";

import { motion } from "framer-motion";
import { hoverLift } from "@/lib/motion";

type CardProps = {
  title: string;
  color?: "blue" | "purple" | "green";
  items?: string[]; // 👈 agora é opcional
  description?: string;
  actions?: {
    label: string;
    href: string;
  }[];
};

const accent = {
  blue: { border: "border-blue-400", title: "text-blue-600", dot: "bg-blue-600" },
  purple: { border: "border-primary", title: "text-primary", dot: "bg-primary" },
  green: { border: "border-emerald-500", title: "text-emerald-600", dot: "bg-emerald-600" },
};

const hoverBg = {
  blue: "hover:bg-blue-50",
  purple: "hover:bg-primary/5",
  green: "hover:bg-emerald-50",
};

export default function Card({
  title,
  items,
  description,
  actions,
  color = "blue",
}: CardProps) {
  return (
    <motion.article
      whileHover={hoverLift}
      className={`card rounded-3xl border shadow-soft transition-colors duration-200 ${hoverBg[color]}`}
    >
      <h3
        className={`text-2xl md:text-3xl font-bold mb-4 border-l-4 pl-6 ${accent[color].title}`}
      >
        {title}
      </h3>

      {/* Descrição (Projetos) */}
      {description && (
        <p className="text-textSecondary text-base mb-6 max-w-[48ch]">
          {description}
        </p>
      )}

      {/* Lista (Skills / Results) */}
      {items && (
        <ul className="space-y-3 text-base">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span
                className={`${accent[color].dot} w-3 h-3 rounded-full mt-1 flex-shrink-0`}
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Ações (GitHub / Demo) */}
      {actions && (
        <div className="flex gap-4 text-sm mt-6">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              className="text-primary font-medium hover:underline"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
