const { z } = require("zod");

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200),
  text: z.string().max(20000).optional(),
  html: z.string().max(200000).optional(),
  replyTo: z.string().email().optional(),
  attachments: z.array(z.object({
    filename: z.string().min(1),
    contentBase64: z.string().min(1),
    contentType: z.string().min(1).optional()
  })).optional()
}).refine((data) => data.text || data.html, {
  message: "Informe ao menos 'text' ou 'html'.",
  path: ["text"]
});

function validateSendEmail(body) {
  return sendEmailSchema.safeParse(body);
}

module.exports = { validateSendEmail };
