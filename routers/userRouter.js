const experss = require("express");
const app = experss.Router();
const userController = require("../controllers/userController");
const { authAdmin } = require("../middleware/auth");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/getAllUsers", authAdmin, userController.getAllUsers);
app.post("/create", authAdmin, userController.createUser);
app.post("/login", userController.loginUser);
module.exports = app;
