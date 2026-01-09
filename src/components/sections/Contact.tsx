"use client";

import { useState } from "react";
import Container from "../layout/Container";
import { CONTACT_CONTENT } from "@/constants/contact";

/**
 * Contact Section
 * Contact form section with email and message fields
 */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement form submission logic
      // For now, just show success message
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-8 md:py-12 dark:bg-[#0f1724]" aria-label="Contact section">
      <Container>
        <div className="max-w-xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
              {CONTACT_CONTENT.title}
            </h2>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              {CONTACT_CONTENT.description}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4" noValidate>
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[rgb(var(--bg-card))] text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[rgb(var(--bg-card))] text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                placeholder="Sua mensagem"
                rows={4}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[rgb(var(--bg-card))] text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-2.5 md:py-3 text-sm md:text-base font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : CONTACT_CONTENT.submitButton}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="text-emerald-600 text-center text-sm">
                Mensagem enviada com sucesso! 🎉
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 text-center text-sm">
                Erro ao enviar mensagem. Tente novamente.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
