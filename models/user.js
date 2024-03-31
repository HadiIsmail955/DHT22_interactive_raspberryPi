const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "require user name"],
      unique: [true, "user name most be unique"],
    },
    password: {
      type: String,
      require: [true, "require password"],
      minlength: [5, "Password must be at least 5 characters long."],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
module.exports = user;
