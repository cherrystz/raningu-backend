const mongoose = require("mongoose");
const canvasSchema = mongoose.Schema({
  id: {
    type: "Number",
  },
});

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const quiz = connection.model("canvas", canvasSchema);
module.exports = quiz;
