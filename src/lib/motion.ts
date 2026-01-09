import { Transition } from "framer-motion";

// Animation easing constants
const EASING = {
  standard: [0.25, 0.46, 0.45, 0.94],
  easeOut: [0.33, 1, 0.68, 1],
  easeIn: [0.32, 0, 0.67, 0],
} as const;

// Duration constants
const DURATION = {
  short: 0.25,
  base: 0.6,
  long: 1,
} as const;

// Fade up animation
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.base, ease: EASING.easeOut } as Transition,
};

// Hover lift animation
export const hoverLift = {
  y: -4,
  transition: { duration: DURATION.short, ease: EASING.easeOut } as Transition,
};

// Scale animation
export const scaleUp = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: DURATION.base, ease: EASING.easeOut } as Transition,
};

// Slide in animation
export const slideInLeft = {
  initial: { x: -24, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: DURATION.base, ease: EASING.easeOut } as Transition,
};

export { DURATION, EASING };
