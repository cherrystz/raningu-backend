const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

let port = process.env.PORT || 3000;

require("./db/connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PATH_API
app.use("/", require("./routes/api.js"));
app.use("/admin", require("./admin/api.js"));
app.use("/log", require("./logs/api.js"));

app.listen(port, () => {
  console.log(`Server is listening ${port}.....`);
});
