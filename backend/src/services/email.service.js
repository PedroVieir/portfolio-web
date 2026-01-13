const { env } = require("../config/env");
const { buildContactEmail } = require("../utils/email-template");
const { sendMail } = require("../utils/mailer");
const logger = require("../utils/logger");

async function sendContactEmail({ name, email, message }) {
  logger.debug("[Email API] Building contact email for", { name, email });

  const { subject, text, html } = buildContactEmail({ name, email, message });

  logger.info("[Email API] Sending mail to", env.CONTACT_TO);

  const result = await sendMail({
    to: env.CONTACT_TO,
    subject,
    text,
    html,
    replyTo: email, // para você responder direto ao visitante
  });

  logger.debug("[Email API] sendMail result:", result);
  return result;
}

module.exports = { sendContactEmail };
