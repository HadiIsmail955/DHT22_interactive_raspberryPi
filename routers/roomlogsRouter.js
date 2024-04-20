const experss = require("express");
const app = experss.Router();
const roomLogsController = require("../controllers/roomLogsController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/roomlogs/:id", roomLogsController.getRoomLogsByRoomID);
module.exports = app;
