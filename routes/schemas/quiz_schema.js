const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
  quiz_id: {
    type: "Number",
  },
  quiz_name: {
    type: "String",
  },
  quiz_multiple: {
    type: "Boolean",
  },
  questions: {
    type: ["Mixed"],
  },
});

module.exports = quizSchema;
