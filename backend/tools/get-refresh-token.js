const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

function ask(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(q, (ans) => { rl.close(); resolve(ans); }));
}

async function main() {
  const creds = JSON.parse(fs.readFileSync("credentials.json", "utf8"));
  const c = creds.installed || creds.web;
  if (!c) throw new Error("credentials.json inválido: esperado 'installed' ou 'web'.");

  const oAuth2Client = new google.auth.OAuth2(
    c.client_id,
    c.client_secret,
    (c.redirect_uris && c.redirect_uris[0]) || "http://localhost"
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("1) Abra este link no navegador e autorize:");
  console.log(authUrl);

  const code = await ask("\n2) Cole aqui o 'code' da URL final e pressione Enter: ");
  const { tokens } = await oAuth2Client.getToken(code.trim());

  console.log("\nTOKENS:");
  console.log(tokens);

  if (!tokens.refresh_token) {
    console.log("\nNão veio refresh_token. Revogue o acesso do app na conta Google e rode novamente.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
