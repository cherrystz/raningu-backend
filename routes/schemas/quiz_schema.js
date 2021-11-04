const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
  quiz_id: {
    type: "Number",
  },
  quiz_name: {
    type: "String",
  },
  data: {
    type: ["Mixed"],
  },
});

module.exports = quizSchema
