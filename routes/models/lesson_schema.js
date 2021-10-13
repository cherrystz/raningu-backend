const mongoose = require("mongoose");
const schema = mongoose.Schema({
  lesson_id: {
    type: "Number",
  },
  lesson_name: {
    type: "String",
  },
  data: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("lesson", schema);
