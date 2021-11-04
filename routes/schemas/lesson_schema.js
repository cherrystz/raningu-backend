const mongoose = require("mongoose");
const lessonSchema = mongoose.Schema({
  lesson_id: {
    type: "Number",
  },
  lesson_name: {
    type: "String",
  },
  data: {
    type: ["Mixed"],
  },
});

module.exports = lessonSchema;
