const experss = require("express");
const app = experss.Router();
const generatorController = require("../controllers/generatorController");
const { authAdmin } = require("../middleware/auth");
app.get("/test", (req, res) => {
  res.send(test);
});
app.post("/create", authAdmin, generatorController.createGenerator);
app.post("/update/:id", authAdmin, generatorController.updateGenerator);
app.post("/getGeneratorById", authAdmin, generatorController.getGeneratorsById);
app.get("/getAllGenerators", authAdmin, generatorController.getAllGenerator);
module.exports = app;
