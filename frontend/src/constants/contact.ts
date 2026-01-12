/**
 * Contact Section Constants
 */

export const CONTACT_CONTENT = {
  title: "Vamos conversar?",
  description: "Entre em contato para falarmos sobre oportunidades, projetos ou colaborações.",
  formFields: [
    {
      type: "text" as const,
      placeholder: "Seu nome",
      name: "name",
      required: true,
    },
    {
      type: "email" as const,
      placeholder: "Seu email",
      name: "email",
      required: true,
    },
    {
      type: "textarea" as const,
      placeholder: "Sua mensagem",
      name: "message",
      required: true,
      rows: 4,
    },
  ],
  submitButton: "Enviar mensagem",
};
