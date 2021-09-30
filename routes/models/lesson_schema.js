const mongoose = require("mongoose");
const schema = mongoose.Schema({
  id: Number,
  word: String,
  read: String,
  meaning: String,
  img: String,
});

module.exports = schema;
