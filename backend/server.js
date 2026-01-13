require("dotenv").config();
const logger = require("./src/utils/logger");

logger.info("[Email API] starting up and loading env...");
let env;
try {
  ({ env } = require("./src/config/env"));
  logger.info("[Email API] env loaded");
} catch (err) {
  logger.error("[Email API] failed to load env:", err.message);
  logger.error(err);
  process.exit(1);
}

const app = require("./app");

const server = app.listen(env.PORT, () => {
  logger.info(`[Email API] listening on port ${env.PORT}`);
});

// Graceful shutdown to free resources and close connections
function shutdown(signal) {
  logger.info(`[Email API] Received ${signal}, shutting down gracefully...`);
  server.close((err) => {
    if (err) {
      logger.error("Error closing server:", err);
      process.exit(1);
    }
    logger.info("Server closed");
    process.exit(0);
  });

  // Force exit after timeout
  setTimeout(() => {
    logger.warn("Force exit after timeout");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception:", err);
  shutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled rejection:", reason);
});
