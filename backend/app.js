const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { env } = require("./src/config/env");
const routes = require("./src/routes");
const { notFound } = require("./src/middlewares/notFound.middleware");
const { errorHandler } = require("./src/middlewares/error.middleware");

const app = express();

// Segurança / headers
app.use(helmet());

// CORS (restrinja ao seu domínio)
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST"],
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
