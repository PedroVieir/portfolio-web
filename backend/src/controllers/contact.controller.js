const { sendContactEmail } = require("../services/email.service");

async function contact(req, res, next) {
  try {
    console.log("[Email API] /contact received, body:", req.body);
    const result = await sendContactEmail(req.body);
    console.log("[Email API] /contact processed, result:", result);
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("[Email API] /contact error:", err);
    next(err);
  }
}

module.exports = { contact };
