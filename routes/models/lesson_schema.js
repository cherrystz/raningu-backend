const mongoose = require("mongoose");
const schema = mongoose.Schema({
  id: Number,
  word: String,
  read: String,
  meaning: String,
  img: String,
});

schema.index({ id: 1 }, { unique: true });
module.exports = schema;
