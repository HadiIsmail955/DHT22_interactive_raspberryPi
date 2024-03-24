const mongoose = require("mongoose");

mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = mongoose;
