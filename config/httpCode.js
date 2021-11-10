const express = require("express");
const app = express();

module.exports = app.use(function (req, res, next) {
  res.status(404);
  res.redirect("/");
});
