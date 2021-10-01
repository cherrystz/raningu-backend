const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

let port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/uploaded"));
app.use("/", require("./routes/api.js"));

app.listen(port, () => {
  console.log(`Server is listening ${port}.....`);
});
