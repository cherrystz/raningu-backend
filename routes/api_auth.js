const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const user = connection.model("users", require("./schemas/user_schema"));

const requireAPI = (key) => {
  return key === process.env.FIREBASE_API_KEY;
};

router.post("/login_method", async (req, res) => {
  if (!requireAPI(req.body.apiKey)) {
    return res.json({ result: "failed", detail: "API Key is not correct!" });
  }
  const { displayName, email, photoURL, uid } = req.body;
  const { providerId } = req.body.providerData[0];
  const doc = await user.find({ uid: uid, providerId: providerId });
  console.log(doc);
  if (!doc[0]) {
    try {
      const schema = {
        uid,
        displayName,
        email,
        photoURL,
        providerId,
      };
      const doc = await user.create(schema);
      return res.json({
        result: "success",
        detail: doc,
        method: "create",
      });
    } catch (err) {
      return res.json({
        result: "failed",
        detail: err,
        method: "create",
      });
    }
  } else {
    return res.json({
      result: "success",
      detail: doc,
      method: "login",
    });
  }
});

module.exports = router;
