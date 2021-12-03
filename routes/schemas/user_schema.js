const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  uid: {
    type: "String",
    unique: true,
    required: true,
  },
  providerId: {
    type: "String",
  }
});

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const user = connection.model("users", userSchema);
module.exports = user;
