const { google } = require("googleapis");
const { env } = require("../config/env");
const logger = require("./logger");

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

let cachedOAuthClient = null;
let cachedGmail = null;

function getOAuthClient() {
  if (cachedOAuthClient) return cachedOAuthClient;
  const oAuth2Client = new google.auth.OAuth2(
    env.GMAIL_API_CLIENT_ID,
    env.GMAIL_API_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({ refresh_token: env.GMAIL_API_REFRESH_TOKEN });
  cachedOAuthClient = oAuth2Client;
  return cachedOAuthClient;
}

async function ensureAccessToken(client, timeout = 10000) {
  // ensure access token is available; with timeout to avoid long blocking
  return await Promise.race([
    client.getAccessToken(),
    new Promise((_, rej) => setTimeout(() => rej(new Error('getAccessToken timeout')), timeout)),
  ]);
}

/**
 * @param {{to:string, subject:string, text?:string, html?:string, replyTo?:string}} params
 */
async function sendMail({ to, subject, text, html, replyTo }) {
  logger.debug("[Email API] Sending via Gmail API", { to, subject });

  const mode = env.GMAIL_MODE || "oauth";
  if (mode !== "oauth") {
    throw new Error(`Unsupported GMAIL_MODE for this setup: ${mode}`);
  }

  const oAuth2Client = getOAuthClient();

  // Memoize gmail client to reuse connections and reduce setup cost
  if (!cachedGmail) cachedGmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const gmail = cachedGmail;

  const fromEmail = env.GMAIL_API_USER;
  const fromHeader = `${env.MAIL_FROM_NAME} <${fromEmail}>`;

  const rawMessage = buildRawMime({ fromHeader, to, subject, text, html, replyTo });

  const encodedMessage = Buffer.from(rawMessage, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // ensure token with timeout
  try {
    await ensureAccessToken(oAuth2Client, Number(process.env.GMAIL_API_TOKEN_TIMEOUT || 10000));
  } catch (err) {
    logger.error("[Email API] Failed to obtain access token:", err?.message || err);
    throw err;
  }

  // Send with a timeout wrapper to avoid long blocking
  const sendPromise = gmail.users.messages.send({ userId: "me", requestBody: { raw: encodedMessage } });
  const timeoutMs = Number(process.env.GMAIL_API_SEND_TIMEOUT || 10000);
  const res = await Promise.race([
    sendPromise,
    new Promise((_, rej) => setTimeout(() => rej(new Error('Gmail send timeout')), timeoutMs)),
  ]);

  logger.info('[Email API] Gmail send complete', { id: res?.data?.id });
  return { messageId: res?.data?.id, accepted: [to], rejected: [] };
}

module.exports = { sendMail };
