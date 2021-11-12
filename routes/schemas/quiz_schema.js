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


const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const quiz = connection.model("quizs", quizSchema);
module.exports = quiz;
