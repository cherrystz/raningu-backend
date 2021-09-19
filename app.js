const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/uploaded"));
app.use("/api/v2", require("./api"));

app.listen(8081, () => {
  console.log("server is ready..");
});
