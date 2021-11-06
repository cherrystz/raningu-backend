const express = require("express");
const router = express.Router();
require("path");

const pathBuild = __dirname + "/frontend/build/";
// router.use(express.static(__dirname + "/public"));

// router.use("/auth", require("./api_auth"));
// router.use("/lessons", require("./api_lesson"));
// router.use("/quiz", require("./api_quiz"));

router.use(express.static(pathBuild));

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get("/", function (req, res) {
  res.sendFile(pathBuild + "index.html");
});
module.exports = router;
