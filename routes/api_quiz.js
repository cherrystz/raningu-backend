const express = require("express");
const router = express.Router();
const quiz = require("./schemas/quiz_schema");

router.get("/", async (req, res) => {
  const doc = await quiz.find({});
  res.json(doc);
});

router.get("/:quiz_id", async (req, res) => {
  const doc = await quiz.findOne({ quiz_id: parseInt(req.params.quiz_id) });
  if (!doc) return res.json({});
  res.json(doc);
});

router.post("/create/:quiz_id", async (req, res) => {
  const doc = await quiz.findOne({ quiz_id: parseInt(req.params.quiz_id) });
  if (!doc) return res.json({});
  // doc.answers = doc.qu.filter((x) => {
  //   return x.isCorrect === true;
  // });
  res.json(doc);
});

module.exports = router;
