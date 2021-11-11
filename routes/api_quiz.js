const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const quiz = connection.model("quizs", require("./schemas/quiz_schema"));

router.get("/", async (req, res) => {
  const doc = await quiz.find({});
  res.json(doc);
});

router.get("/:quiz_id", async (req, res) => {
  const doc = await quiz.findOne({ quiz_id: parseInt(req.params.quiz_id) });
  if (!doc) return res.json({});
  res.json(doc);
});

module.exports = router;
