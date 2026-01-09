import { BadgeProps } from "@/types";
import { COLOR_SCHEME, DEFAULT_COLOR } from "@/constants/colors";

const BADGE_STYLES = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-700 dark:text-blue-300",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/50",
    text: "text-purple-700 dark:text-purple-300",
  },
  green: {
    bg: "bg-emerald-100 dark:bg-emerald-900/50",
    text: "text-emerald-700 dark:text-emerald-300",
  },
};

/**
 * Badge Component
 * Displays a colored badge with text content
 */
export default function Badge({
  text,
  color = DEFAULT_COLOR,
}: BadgeProps) {
  const style = BADGE_STYLES[color];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-tight ${style.bg} ${style.text}`}
      role="status"
      aria-label={`Badge: ${text}`}
    >
      {text}
    </span>
  );
}
