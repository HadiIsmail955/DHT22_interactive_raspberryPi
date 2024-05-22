const experss = require("express");
const app = experss.Router();
const generatorLogsController = require("../controllers/generatorLogsController");
const { authAdmin } = require("../middleware/auth");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get(
  "/allGeneratorlogs",
  authAdmin,
  generatorLogsController.getAllGeneratorLogs
);
app.get(
  "/generatorlogs/:id",
  authAdmin,
  generatorLogsController.getGeneratorLogsByGeneratorId
);
module.exports = app;
