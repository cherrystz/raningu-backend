const express = require("express");
const router = express.Router();
const user = require("./models/user_schema");
const config = require("./services/config.json");

router.post("/login_method", async (req, res) => {
  try {
    const doc = await user.create(req.body);
    res.json({ result: "success", detail: doc });
  } catch (err) {
    res.json({ result: "failed", detail: err });
  }
});

module.exports = router;
