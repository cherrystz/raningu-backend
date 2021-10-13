const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const lesson = require("./models/lesson_schema");

router.get("/", async (req, res) => {
  const doc = await lesson.find({});
  res.json(doc);
});

router.get("/chapter:chapter", async (req, res) => {
  const doc = await lesson.find({ lesson_id: parseInt(req.params.chapter) });
  res.json(doc);
});

router.get("/chapter:chapter/:id", async (req, res) => {
  const doc = await lesson.find({ lesson_id: parseInt(req.params.chapter) });
  const result = doc[0].data.find((item) => {
    return item.id === parseInt(req.params.id);
  });
  res.json(result);
});

// router.post("/lesson:chapter", async (req, res) => {
//   const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
//   try {
//     const doc = await Lesson.create(req.body);
//     res.json({ result: "success", doc });
//   } catch (err) {
//     res.json({ result: "failed", err });
//   }
// });

// router.put("/lesson:chapter", async (req, res) => {
//   const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
//   try {
//     await Lesson.findOneAndUpdate({ id: req.body.id }, req.body);
//     res.json({ result: "success" });
//   } catch (err) {
//     res.json({ result: "failed", err });
//   }
// });

// router.delete("/lesson:chapter/:id", async (req, res) => {
//   const Lesson = connection.model(`lesson${req.params.chapter}`, schema);
//   let doc = await Lesson.findOneAndDelete({ id: parseInt(req.params.id) });
//   res.json({ result: "success", message: doc });
// });

module.exports = router;
