const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uid: String,
  displayName: String,
  email: String,
  password: String,
  providerId: String,
  level: { type: String, default: "normal" },
  created: { type: Date, default: Date.now },
});

schema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("user", schema);
