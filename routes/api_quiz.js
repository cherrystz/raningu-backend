const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const quiz = require("./models/quiz_schema");

router.get("/", async (req, res) => {
  const doc = await quiz.find({});
  res.json(doc);
});

router.get("/:quiz_id", async (req, res) => {
  const doc = await quiz.find({ quiz_id: parseInt(req.params.quiz_id) });
  res.json(doc);
});

module.exports = router;
