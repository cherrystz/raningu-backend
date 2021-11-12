const express = require("express");
const router = express.Router();
const canvas = require("./schemas/canvas_schema");

router.get("/", async (req, res) => {
  const doc = await canvas.find({});
  res.json(doc);
});

router.get("/hiragana", async (req, res) => {
  const doc = await canvas.findOne({ canvas_name: "Hiragana" });
  res.json(doc);
});

router.get("/katakana", async (req, res) => {
  const doc = await canvas.findOne({ canvas_name: "Katakana" });
  res.json(doc);
});

module.exports = router;
