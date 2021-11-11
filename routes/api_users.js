const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const admin = require("./services/firebaseConfig");

const connection = mongoose.createConnection(
  `${process.env.DB_URI_PATH}raningu-db`
);
const user = connection.model("users", require("./schemas/user_schema"));

router.post("/get_user", async (req, res) => {
  var data_records = await admin
    .auth()
    .listUsers()
    .then((data) => {
      return data.users;
    });
  res.send(data_records);
});

router.post("/delete_user", async (req, res) => {
  const doc = await user.find();
  const data = doc.map((admin) => {
    return admin.uid;
  });
  if (!data.includes(req.body.adminUid)) {
    return res.json({ result: "failed", msg: "Access Denied!" });
  }
  await admin
    .auth()
    .deleteUser(req.body.uid)
    .then(() => {
      return res.json({
        result: "success",
        msg: "Successfully deleted user!",
      });
    })
    .catch((error) => {
      return res.json({ result: "failed", msg: error.message });
    });
});

router.post("/enable_user", async (req, res) => {
  const doc = await user.find();
  const data = doc.map((admin) => {
    return admin.uid;
  });
  if (!data.includes(req.body.adminUid)) {
    return res.json({ result: "failed", msg: "Access Denied!" });
  }
  await admin
    .auth()
    .updateUser(req.body.uid, {
      disabled: false,
    })
    .then(() => {
      return res.json({
        result: "success",
        msg: "Successfully enabled user!",
      });
    })
    .catch((error) => {
      return res.json({ result: "failed", msg: error.message });
    });
});

router.post("/disable_user", async (req, res) => {
  const doc = await user.find();
  const data = doc.map((admin) => {
    return admin.uid;
  });
  if (!data.includes(req.body.adminUid)) {
    return res.json({ result: "failed", msg: "Access Denied!" });
  }
  await admin
    .auth()
    .updateUser(req.body.uid, {
      disabled: true,
    })
    .then(() => {
      return res.json({
        result: "success",
        msg: "Successfully disabled user!",
      });
    })
    .catch((error) => {
      return res.json({ result: "failed", msg: error.message });
    });
});

module.exports = router;
