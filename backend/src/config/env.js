function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

const env = {
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  CONTACT_TO: required("CONTACT_TO"),
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "Email API",

  // Gmail API (OAuth2)
  GMAIL_API_CLIENT_ID: required("GMAIL_API_CLIENT_ID"),
  GMAIL_API_CLIENT_SECRET: required("GMAIL_API_CLIENT_SECRET"),
  GMAIL_API_REFRESH_TOKEN: required("GMAIL_API_REFRESH_TOKEN"),
  GMAIL_API_USER: required("GMAIL_API_USER"), // o Gmail que efetivamente envia
};

module.exports = { env };
