const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const admin = require("./services/firebaseConfig");

const requireAPI = (key) => {
  return key === process.env.FIREBASE_API_KEY;
};

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const user = connection.model("users", require("./schemas/user_schema"));

router.post("/admin_login", async (req, res) => {
  const { uid, apiKey } = req.body;
  if (!requireAPI(apiKey)) {
    return res.json({ result: "failed", detail: "API Key is not correct!" });
  }
  await admin
    .auth()
    .getUser(req.body.uid)
    .then(async (userRecord) => {
      if (
        userRecord.providerData[0].providerId ===
        req.body.providerData[0].providerId
      ) {
        const doc = await user.findOne({ uid });
        if (doc) {
          return res.json({
            result: "success",
            detail: "admin",
          });
        } else {
          return res.json({
            result: "failed",
            detail: "access",
          });
        }
      }
      // IF PROVIDER ERROR
      else {
        return res.json({
          result: "failed",
          detail: "provider",
        });
      }
    })
    .catch((error) => {
      return res.send({ result: "failed", detail: "fetch" });
    });
});

module.exports = router;
