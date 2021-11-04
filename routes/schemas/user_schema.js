const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  uid: {
    type: "String",
    unique: true,
    required: true,
  },
  displayName: {
    type: "String",
  },
  email: {
    type: "String",
    unique: true,
    required: true,
  },
  photoURL: {
    type: "String",
  },
  providerId: {
    type: "String",
  },
});

module.exports = userSchema;
