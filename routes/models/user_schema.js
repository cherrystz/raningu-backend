const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  level: { type: String, default: "normal" },
  created: { type: Date, default: Date.now },
});

schema.index({ email: 1 }, { unique: true });
const connection = mongoose.createConnection(
  "mongodb+srv://dbPlug:159753@raninguu.1ibfq.mongodb.net/users"
);
module.exports = connection.model("user", schema);
