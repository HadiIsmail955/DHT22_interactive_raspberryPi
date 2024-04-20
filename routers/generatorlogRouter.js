const experss = require("express");
const app = experss.Router();
const generatorLogsController = require("../controllers/generatorLogsController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/allGeneratorlogs", generatorLogsController.getAllGeneratorLogs);
app.get("/generatorlogs/:id", generatorLogsController.getGeneratorLogsByGeneratorId);
module.exports = app;
