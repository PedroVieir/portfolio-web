import { ContainerProps } from "@/types";

/**
 * Container Component
 * Centered max-width container with consistent padding
 */
export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
