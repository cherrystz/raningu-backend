const express = require("express");
const router = express.Router();

router.use("/auth", require("./api_auth"));
router.use("/lessons", require("./api_lesson"));
router.use("/quiz", require("./api_quiz"));
router.use("/users", require("./api_users"));
// add api
module.exports = router;
