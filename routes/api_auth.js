const express = require("express");
const router = express.Router();
const user = require("./models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("./jwt");
const config = require("./services/config.json");

//Google Login
router.post("/googleauth", async (req, res) => {
  const googleUser = req.body;
  const doc = await user.findOne({
    email: googleUser.email,
    providerId: googleUser.providerData[0].providerId,
  });

  if (doc) {
    if (googleUser.apiKey === config.apiKey) {

      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username,
      };
      const token = jwt.sign(payload, "100h");

      res.json({
        result: "success",
        token,
        message: "Google login successful...",
      });

    } else {
      res.json({ result: "failed", message: "Something wrong..." });
    }
  } else {
    try {
      const result = await user.create(req.body);
      res.json({ result: "success", detail: doc });
    } catch (err) {
      res.json({ result: "failed", detail: err });
    }
  }
});

router.post("/login", async (req, res) => {
  // destructuring || unpack
  const { username, password } = req.body;
  const doc = await user.findOne({ username });

  if (doc) {
    const isPasswordValid = await bcrypt.compare(password, doc.password);
    if (isPasswordValid) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username,
      };
      const token = jwt.sign(payload, "100h");

      res.json({ result: "success", token, message: "login successful..." });
    } else {
      res.json({ result: "failed", message: "invalid password" });
    }
  } else {
    res.json({ result: "failed", message: "invalid username" });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const doc = await user.create(req.body);
    res.json({ result: "success", detail: doc });
  } catch (err) {
    res.json({ result: "failed", detail: err });
  }
});

module.exports = router;
