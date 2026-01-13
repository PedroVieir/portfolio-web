const { google } = require("googleapis");
const { env } = require("../config/env");

function base64UrlEncode(str) {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildRawMime({ fromHeader, to, subject, text, html, replyTo }) {
  const isHtml = Boolean(html);
  const body = (html || text || "").toString();

  const headers = [
    `From: ${fromHeader}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    isHtml
      ? 'Content-Type: text/html; charset="UTF-8"'
      : 'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].filter(Boolean);

  return headers.join("\r\n");
}

function getAuthClient() {
  const oAuth2Client = new google.auth.OAuth2(
    env.GMAIL_API_CLIENT_ID,
    env.GMAIL_API_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({ refresh_token: env.GMAIL_API_REFRESH_TOKEN });
  return oAuth2Client;
}

/**
 * @param {{to:string, subject:string, text?:string, html?:string, replyTo?:string}} params
 */
async function sendMail({ to, subject, text, html, replyTo }) {
  console.log("[Email API] Sending via Gmail API", { to, subject });

  const mode = env.GMAIL_MODE || "oauth";
  if (mode !== "oauth") {
    throw new Error(`Unsupported GMAIL_MODE for this setup: ${mode}`);
  }

  const oAuth2Client = new google.auth.OAuth2(
    env.GMAIL_API_CLIENT_ID,
    env.GMAIL_API_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({ refresh_token: env.GMAIL_API_REFRESH_TOKEN });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const fromEmail = env.GMAIL_API_USER;
  const fromHeader = `${env.MAIL_FROM_NAME} <${fromEmail}>`;

  const isHtml = Boolean(html);
  const body = (html || text || "").toString();

  const headers = [
    `From: ${fromHeader}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    isHtml
      ? 'Content-Type: text/html; charset="UTF-8"'
      : 'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].filter(Boolean);

  const rawMessage = headers.join("\r\n");

  const encodedMessage = Buffer.from(rawMessage, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await oAuth2Client.getAccessToken();

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });

  return { messageId: res.data.id, accepted: [to], rejected: [] };
}


module.exports = { sendMail };
