const experss = require("express");
const app = experss.Router();
const generatorController = require("../controllers/generatorController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.post("/create", generatorController.createGenerator);
app.post("/update/:id", generatorController.updateGenerator);
app.post("/getGeneratorById", generatorController.getGeneratorsById);
app.get("/getAllGenerators", generatorController.getAllGenerator);
module.exports = app;
