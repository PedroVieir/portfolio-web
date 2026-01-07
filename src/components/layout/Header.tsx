"use client";

import { useState } from "react";
import Container from "./Container";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <span className="font-semibold">Pedro Vieira</span>

          <nav className="hidden md:flex gap-6">
            <a href="#projects" className="text-sm font-medium tracking-wide text-textSecondary hover:text-textPrimary transition-colors focus-visible:ring-4 focus-visible:ring-primary/20 rounded-md px-2 py-1">
              Projetos
            </a>
            <a href="#contact" className="text-sm font-medium tracking-wide text-textSecondary hover:text-textPrimary transition-colors focus-visible:ring-4 focus-visible:ring-primary/20 rounded-md px-2 py-1">
              Contato
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md focus-visible:ring-4 focus-visible:ring-primary/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden mt-2">
            <div className="flex flex-col gap-2 p-4">
              <a href="#projects" onClick={() => setOpen(false)} className="text-sm font-medium tracking-wide text-textSecondary hover:text-textPrimary transition-colors rounded-md px-2 py-2">
                Projetos
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="text-sm font-medium tracking-wide text-textSecondary hover:text-textPrimary transition-colors rounded-md px-2 py-2">
                Contato
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
