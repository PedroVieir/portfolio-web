"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";
import Badge from "../ui/Badge";
import { HERO_CONTENT } from "@/constants/hero";
import { fadeUp } from "@/lib/motion";

/**
 * Hero Section
 * Main hero section with greeting, title, and skill badges
 */
export default function Hero() {
  return (
    <section className="pt-4 pb-3 md:pt-6 md:pb-6" aria-label="Hero section">
      <Container>
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={fadeUp.transition}
          className="flex flex-col items-center text-center gap-2 md:gap-4"
        >
          {/* Name */}
          <h1 className="text-3xl md:text-6xl font-extrabold text-primary">
            {HERO_CONTENT.name}
          </h1>

          {/* Role */}
          <h2 className="text-sm md:text-xl font-semibold text-textPrimary">
            {HERO_CONTENT.role}
          </h2>

          {/* Bio */}
          <p className="max-w-lg text-xs md:text-base text-textSecondary leading-relaxed">
            {HERO_CONTENT.bio}
          </p>
            
          {/* Skills Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {HERO_CONTENT.skills.map((skill) => (
              <Badge
                key={skill.text}
                text={skill.text}
                color={skill.color}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
