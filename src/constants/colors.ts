/**
 * Color Theme Constants
 * Centralized color mapping for consistent styling
 */

import { ColorTheme } from "@/types";

interface ColorConfig {
  border: string;
  title: string;
  dot: string;
  hover: string;
}

export const COLOR_SCHEME: Record<ColorTheme, ColorConfig> = {
  blue: {
    border: "border-blue-400 dark:border-blue-700",
    title: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-600 dark:bg-blue-500",
    hover: "hover:bg-blue-50 dark:hover:bg-blue-900/40",
  },
  purple: {
    border: "border-primary dark:border-primary/40",
    title: "text-primary dark:text-purple-400",
    dot: "bg-primary dark:bg-purple-500",
    hover: "hover:bg-primary/5 dark:hover:bg-purple-900/30",
  },
  green: {
    border: "border-emerald-500 dark:border-emerald-700",
    title: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-600 dark:bg-emerald-500",
    hover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/40",
  },
};

export const DEFAULT_COLOR: ColorTheme = "blue";
