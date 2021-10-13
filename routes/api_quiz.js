const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const quiz = require("./models/quiz_schema");

router.get("/:quizid", async (req, res) => {
  const doc = await quiz.find({ quiz_id: parseInt(req.params.quizid) });
  res.json(doc);
});

router.get("/", async (req, res) => {
  const doc = await quiz.find({});
  res.json(doc);
});

module.exports = router;
