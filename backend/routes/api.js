const express = require("express");
const router = express.Router();
require("./db/connection");

router.use("/auth", require("./api_auth"));
router.use("/lessons", require("./api_lesson"));

module.exports = router;
