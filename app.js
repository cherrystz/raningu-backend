const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const handleHTTP = require("./config/httpCode");

let port = process.env.PORT || 3000;

require("./db/connection");

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3005",
    "http://localhost:12819",
    "http://harctto.3bbddns.com:12819",
    "https://websitename-csc361.web.app",
    "https://raningu-edu.web.app/lesson",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PATH_API
app.use("/data", require("./routes/api.js"));
app.use("/", require("./admin/api.js"));
app.use("/log", require("./logs/api.js"));
app.use(handleHTTP);
// HAVE 3 PATH

app.listen(port, () => {
  console.log(`Server is listening ${port}.....`);
});
