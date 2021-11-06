const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

let port = process.env.PORT || 3000;

require("./db/connection");

var whitelist = ["http://localhost:3005", "https://websitename-csc361.web.app"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PATH_API
app.use("/data", require("./routes/api.js"));
app.use("/", require("./admin/api.js"));
app.use("/log", require("./logs/api.js"));
// HAVE 3 PATH

app.listen(port, () => {
  console.log(`Server is listening ${port}.....`);
});
