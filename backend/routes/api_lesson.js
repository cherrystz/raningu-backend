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

// router.post("/", async (req, res) => {
//   try {
//     let fields = {
//       id: 1,
//       word: "あ",
//       read: "a",
//       meaning: "อะ",
//       img: "https://www.nhk.or.jp/lesson/assets/images/letters/hira/a.png",
//     };
//     const doc = await Lesson1.create(fields);
//     res.json({ result: "ok", doc });
//   } catch (err) {
//     res.json({ result: "nok", err });
//   }
// });

module.exports = router;
