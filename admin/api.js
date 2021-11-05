const express = require("express");
const router = express.Router();
const path = require("path");

// router.use(express.static(__dirname + "/public"));

// router.use("/auth", require("./api_auth"));
// router.use("/lessons", require("./api_lesson"));
// router.use("/quiz", require("./api_quiz"));

router.use(
    express.static(path.resolve(__dirname, "./frontend/backend-crud/build"))
);

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

router.get("/*", function (req, res) {
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./frontend/backend-crud/build", "index.html")
    );
  });
});
module.exports = router;
