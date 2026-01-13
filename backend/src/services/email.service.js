const { env } = require("../config/env");
const { buildContactEmail } = require("../utils/email-template");
const { sendMail } = require("../utils/mailer");

async function sendContactEmail({ name, email, message }) {
  console.log("[Email API] Building contact email for:", { name, email });

  const { subject, text, html } = buildContactEmail({ name, email, message });

  console.log("[Email API] Sending mail to:", env.CONTACT_TO);

  const result = await sendMail({
    to: env.CONTACT_TO,
    subject,
    text,
    html,
    replyTo: email, // para você responder direto ao visitante
  });

  console.log("[Email API] sendMail result:", result);
  return result;
}

module.exports = { sendContactEmail };
