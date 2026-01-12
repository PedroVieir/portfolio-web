const router = require("express").Router();

const healthRoutes = require("./health.routes");
const contactRoutes = require("./contact.routes");

router.use(healthRoutes);
router.use(contactRoutes);

module.exports = router;
