const express = require("express");
const router = express.Router();
const lesson = require("./schemas/lesson_schema");

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

module.exports = router;
