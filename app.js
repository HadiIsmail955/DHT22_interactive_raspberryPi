const express = require("express");
const parser = require("body-parser");
const router = require("./routes/index.js");
//const auth = require("./routes/authRouter.js");
const cors = require("cors");
require("dotenv").config();
require("./db.js");

const app = express();
app.use(cors())
app.use(parser.json());
app.use(parser.urlencoded());
app.use("/", router);
//app.use("/auth");

app.listen(process.env.PORT || 5001, () => {
  try {
    console.log("connnected at port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
