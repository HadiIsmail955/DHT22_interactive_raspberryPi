const experss = require("express");
const app = experss.Router();
const roomLogsController = require("../controllers/roomLogsController");
const { auth } = require("../middleware/auth");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/roomlogs/:id", auth, roomLogsController.getRoomLogsByRoomID);
module.exports = app;
