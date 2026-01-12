"use client";

import { motion } from "framer-motion";
import { hoverLift } from "@/lib/motion";
import { CardProps } from "@/types";
import { COLOR_SCHEME, DEFAULT_COLOR } from "@/constants/colors";

/**
 * Card Component
 * Versatile card for displaying skills, projects, and other content
 * Supports optional description, items list, and action links
 */
export default function Card({
  title,
  items,
  description,
  actions,
  color = DEFAULT_COLOR,
}: CardProps) {
  const colors = COLOR_SCHEME[color];

  return (
    <motion.article
      whileHover={hoverLift}
      className={`card rounded-3xl border shadow-soft transition-colors duration-200 ${colors.hover} ${colors.border} p-4 md:p-8 bg-white dark:bg-black text-gray-900 dark:text-white`}
    >
      {/* Title */}
      <h3
        className={`text-lg md:text-2xl font-bold mb-2 md:mb-3 border-l-4 pl-3 md:pl-4 ${colors.title}`}
      >
        {title}
      </h3>

      {/* Description (Projects) */}
      {description && (
        <p className="text-sm md:text-base mb-4 md:mb-6 max-w-[48ch] text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}

      {/* Items List (Skills / Results) */}
      {items && items.length > 0 && (
        <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 md:gap-3">
              <span
                className={`${colors.dot} w-3 h-3 rounded-full mt-1 flex-shrink-0`}
                aria-hidden="true"
              />
              <span className="leading-relaxed text-gray-700 dark:text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Actions (GitHub / Demo) */}
      {actions && actions.length > 0 && (
        <div className="flex gap-4 text-sm mt-6">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
