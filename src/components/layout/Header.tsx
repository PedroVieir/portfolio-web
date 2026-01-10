"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import { NAVIGATION_ITEMS, AUTHOR_NAME } from "@/constants/navigation";

/**
 * Header Component
 * Main navigation header with mobile menu and theme toggle
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize theme from localStorage. Default to light regardless of system preference.
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      // Default to light when no explicit user preference is stored
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur border-b border-gray-200/50 dark:border-transparent">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <a href="#home" className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
            {AUTHOR_NAME}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center" aria-label="Main navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-sm font-medium tracking-wide text-gray-600 dark:text-white hover:text-primary dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Theme toggle desktop */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {theme === "dark" ? (
                <span aria-hidden>🌙</span>
              ) : (
                <span aria-hidden>☀️</span>
              )}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {theme === "dark" ? <span aria-hidden>🌙</span> : <span aria-hidden>☀️</span>}
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="p-2 rounded-md focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-2 pb-4 bg-white/95 dark:bg-black/95 rounded-lg shadow-md"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-medium tracking-wide text-textSecondary dark:text-white hover:text-textPrimary dark:hover:text-white transition-colors rounded-md px-2 py-2 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
