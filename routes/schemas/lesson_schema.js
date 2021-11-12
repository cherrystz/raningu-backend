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

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const lesson = connection.model("lessons", lessonSchema);
module.exports = lesson;
