const mongoose = require("mongoose");
const schema = mongoose.Schema({
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

module.exports = mongoose.model("quizs", schema);
