const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("./jwt");

router.post("/login", async (req, res) => {
  // destructuring || unpack
  const { email, password } = req.body;
  const doc = await Users.findOne({ email });

  if (doc) {
    const isPasswordValid = await bcrypt.compare(password, doc.password);
    if (isPasswordValid) {
      const payload = {
        id: doc._id,
        level: doc.level,
        email: doc.email,
      };
      const token = jwt.sign(payload, "100h");

      res.json({ result: "success", token, message: "login successful..." });
    } else {
      res.json({ result: "failed", message: "invalid password" });
    }
  } else {
    res.json({ result: "failed", message: "invalid email" });
  }
});

router.get("/logout", async (req, res) => {
  jwt.destroy(req.token);
});

router.post("/register", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const doc = await Users.create(req.body);
    res.json({ result: "success", detail: doc });
  } catch (err) {
    res.json({ result: "failed", detail: err });
  }
});

module.exports = router;
