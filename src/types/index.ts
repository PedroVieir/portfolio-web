/**
 * Type Definitions
 * Central location for all TypeScript interfaces and types
 */

// Color theme type
export type ColorTheme = "blue" | "purple" | "green";

// Project architecture configuration
export interface Architecture {
  frontend: string;
  services: string[];
  cache: string;
  databases: string[];
  search?: string;
}

// Project case study
export interface ProjectCase {
  id: string;
  title: string;
  description: string;
  frontend: string[];
  backend: string[];
  achievements: string[];
  architecture: Architecture;
}

// Skill card data
export interface SkillCard {
  title: string;
  color: ColorTheme;
  items: string[];
}

// Navigation item
export interface NavItem {
  href: string;
  label: string;
  id: string;
}

// Card component props
export interface CardProps {
  title: string;
  color?: ColorTheme;
  items?: string[];
  description?: string;
  actions?: Array<{
    label: string;
    href: string;
  }>;
}

// Badge component props
export interface BadgeProps {
  text: string;
  color?: ColorTheme;
}

// Container component props
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
