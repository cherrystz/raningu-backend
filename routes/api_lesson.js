const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const schema = require("./models/lesson_schema");
const connection = mongoose.createConnection(
  "mongodb+srv://dbPlug:159753@raninguu.1ibfq.mongodb.net/lessons"
);

router.get("/lesson:chapter", async (req, res) => {
  const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
  const doc = await Lesson.find();
  res.json(doc);
});

router.get("/lesson:chapter/:id", async (req, res) => {
  const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
  const doc = await Lesson.findOne({ id: parseInt(req.params.id) });
  res.json(doc);
});

router.post("/lesson:chapter", async (req, res) => {
  const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
  try {
    const doc = await Lesson.create(req.body);
    res.json({ result: "success", doc });
  } catch (err) {
    res.json({ result: "failed", err });
  }
});

router.put("/lesson:chapter", async (req, res) => {
  const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
  try {
    await Lesson.findOneAndUpdate({ id: req.body.id }, req.body);
    res.json({ result: "success" });
  } catch (err) {
    res.json({ result: "failed", err });
  }
});

router.delete("/lesson:chapter/:id", async (req, res) => {
  const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
  let doc = await Lesson.findOneAndDelete({ id: parseInt(req.params.id) });
  res.json({ result: "success", message: doc });
});

module.exports = router;
