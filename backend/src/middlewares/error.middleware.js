const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('[Email API] Unhandled error:', err?.message || err);
  res.status(500).json({
    error: "Erro interno",
    message: err?.message || "unknown",
  });
}

module.exports = { errorHandler };
