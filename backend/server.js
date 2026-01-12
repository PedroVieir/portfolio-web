require("dotenv").config();

console.log("[Email API] starting up and loading env...");
let env;
try {
  ({ env } = require("./src/config/env"));
  console.log("[Email API] env loaded");
} catch (err) {
  console.error("[Email API] failed to load env:", err.message);
  console.error(err);
  process.exit(1);
}

const app = require("./app");

app.listen(env.PORT, () => {
  console.log(`[Email API] listening on port ${env.PORT}`);
});
