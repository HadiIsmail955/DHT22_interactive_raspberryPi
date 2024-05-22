const experss = require("express");
const app = experss.Router();
const userController = require("../controllers/userController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/getAllUsers", userController.getAllUsers);
app.post("/create", userController.createUser);
app.post("/login", userController.loginUser);
module.exports = app;
