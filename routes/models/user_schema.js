const mongoose = require("mongoose");
const schema = mongoose.Schema({
  user: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("user", schema);
