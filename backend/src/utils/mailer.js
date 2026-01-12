const nodemailer = require("nodemailer");
const { env } = require("../config/env");

function createTransporter() {
  const secure = env.GMAIL_PORT === 465;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: env.GMAIL_PORT,
    secure,
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * @param {{to:string, subject:string, text?:string, html?:string, replyTo?:string}} params
 */
async function sendMail(params) {
  const transporter = createTransporter();

  const from = `${env.MAIL_FROM_NAME} <${env.GMAIL_USER}>`;

  const info = await transporter.sendMail({
    from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
    replyTo: params.replyTo, // responder direto para o usuário do formulário
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
}

module.exports = { sendMail };
