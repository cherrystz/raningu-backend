const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const showUser = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};

const requireAPI = (key) => {
  return key === process.env.FIREBASE_API_KEY;
};

router.post("/update_user", async (req, res) => {
  if (!requireAPI(req.body.apiKey)) {
    return res.json({ result: "failed", detail: "API Key is not correct!" });
  }
  const { displayName, email, photoURL, uid } = req.body;
  const schema = {
    uid,
    displayName,
    email,
    photoURL,
  };

  await user.updateOne(
    { uid: uid },
    {
      $set: {
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      },
    }
  );
  const doc = await user.findOne(schema);
  if (!doc[0]) {
    return res.json({ result: "success", detail: doc, method: "update" });
  } else {
    return res.json({ result: "failed", detail: doc, method: "update" });
  }
});

router.delete("/delete_user", async (req, res) => {
  if (!requireAPI(req.body.apiKey)) {
    return res.json({ result: "failed", detail: "API Key is not correct!" });
  }
  const { displayName, email, uid } = req.body;
  const { providerId } = req.body.providerData[0];
  if (providerId !== "email") {
    const doc = await user.deleteOne({ uid: uid, displayName: displayName });
    if (doc.deletedCount) {
      return res.json({ result: "success", detail: doc, method: "delete" });
    } else {
      return res.json({ result: "failed", detail: doc, method: "delete" });
    }
  } else {
    const doc = await user.deleteOne({ uid: uid, email: email });
    if (doc.deletedCount) {
      return res.json({ result: "success", detail: doc, method: "delete" });
    } else {
      return res.json({ result: "failed", detail: doc, method: "delete" });
    }
  }
});

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

router.post("/get_user", async (req, res) => {});

module.exports = router;
