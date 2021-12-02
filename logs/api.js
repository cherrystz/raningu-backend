const express = require("express");
const router = express.Router();
const logs = require("./schemas/log_schema");

router.post("/quiz_log", async (req, res) => {
  const doc = await logs.create(req.body);
  res.json(doc);
});

router.get("/quiz_log", async (req, res) => {
  const doc = await logs.find({ uid: req.body.uid });
  res.json(doc);
});

module.exports = router;
