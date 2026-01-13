const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { env } = require("./src/config/env");
const routes = require("./src/routes");
const { notFound } = require("./src/middlewares/notFound.middleware");
const { errorHandler } = require("./src/middlewares/error.middleware");
const logger = require("./src/utils/logger");

const app = express();

// Importante: habilite trust proxy antes do rateLimit
app.set("trust proxy", 1);

// Segurança / headers
app.use(helmet());

// CORS (restrinja ao seu domínio)
const allowedOrigins = String(env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

logger.info("[Email API] CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Sem origin (requests server-to-server/curl) devem ser permitidas
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Parse JSON
app.use(express.json({ limit: "1mb" }));

// Rate limit básico
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
  })
);

// Rotas
app.use(routes);

// 404 + handler de erro
app.use(notFound);
app.use(errorHandler);

module.exports = app;
