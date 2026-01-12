const router = require("express").Router();
const { z } = require("zod");
const { validateBody } = require("../middlewares/validate.middleware");
const { contact } = require("../controllers/contact.controller");

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
});

router.post("/contact", validateBody(contactSchema), contact);

module.exports = router;
