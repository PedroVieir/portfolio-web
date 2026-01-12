function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

const env = {
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  CONTACT_TO: required("CONTACT_TO"),

  GMAIL_USER: required("GMAIL_USER"),
  GMAIL_APP_PASSWORD: required("GMAIL_APP_PASSWORD"),
  GMAIL_PORT: Number(process.env.GMAIL_PORT || 465),
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "Email API",
};

module.exports = { env };
