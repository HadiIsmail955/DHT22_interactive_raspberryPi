const experss = require("express");
const app = experss.Router();
const roomsController = require("../controllers/roomController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/getAllRooms", roomsController.getAllRooms);
app.post("/getRoomById", roomsController.getRoomsById);
app.post("/create", roomsController.createRoom);
app.post("/update/:id", roomsController.updateRoom);
app.post("/getRoomsByGeneratorId", roomsController.getRoomsByGeneratorsId);
module.exports = app;
