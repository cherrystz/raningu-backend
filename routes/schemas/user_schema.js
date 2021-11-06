const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  uid: {
    type: "String",
    unique: true,
    required: true,
  },
  providerId: {
    type: "String",
  },
  latestLogin: {
    type: "String",
  },
});

module.exports = userSchema;
