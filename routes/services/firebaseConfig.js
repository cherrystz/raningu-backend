const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = requireAPI = (key) => {
  return key === process.env.FIREBASE_API_KEY;
};

module.exports = admin;
