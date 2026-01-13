function errorHandler(err, req, res, next) {
  console.error("[Email API] Unhandled error:", err);
  res.status(500).json({
    error: "Erro interno",
    message: err?.message || "unknown",
  });
}

module.exports = { errorHandler };
