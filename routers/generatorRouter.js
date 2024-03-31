const experss = require("express");
const app = experss.Router();
const generatorController = require("../controllers/generatorController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.post("/create", generatorController.createGenerator);
app.post("/updated/:id", generatorController.updateGenerator);
module.exports = app;
