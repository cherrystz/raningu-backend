const express = require("express");
const router = express.Router();
const lesson = require("./schemas/lesson_schema");

const requireAPI = (key) => {
  return key === process.env.FIREBASE_API_KEY;
};

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

router.post("/create", async (req, res) => {
  const doc = await lesson.create(req.body);
  res.json(doc);
});

module.exports = router;
