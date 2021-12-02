const mongoose = require("mongoose");
const logsSchema = mongoose.Schema({
  uid: {
    type: "String",
  },
  date: {
    type: "Date",
  },
  score: {
    type: "Number",
  },
  quiz_name: {
    type: "String",
  },
});

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const logs = connection.model("logs", logsSchema);
module.exports = logs;
