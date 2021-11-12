const mongoose = require("mongoose");
const canvasSchema = mongoose.Schema({
  canvas_name: {
    type: "String",
  },
  data: {
    type: ["Mixed"],
  },
});

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const quiz = connection.model("canvas", canvasSchema);
module.exports = quiz;
