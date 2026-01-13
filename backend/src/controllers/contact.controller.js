const { sendContactEmail } = require("../services/email.service");
const logger = require("../utils/logger");

async function contact(req, res, next) {
  try {
    // Avoid verbose logs in production
    logger.debug("[Email API] /contact received", {
      name: req.body?.name,
      email: req.body?.email,
      messageLength: String(req.body?.message || "").length,
    });

    const result = await sendContactEmail(req.body);

    logger.info("[Email API] /contact processed", { accepted: result?.accepted?.length || 0 });
    res.status(200).json({ ok: true, result });
  } catch (err) {
    logger.error("[Email API] /contact error:", err?.message || err);
    next(err);
  }
}

module.exports = { contact };
