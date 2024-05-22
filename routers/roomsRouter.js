const experss = require("express");
const app = experss.Router();
const roomsController = require("../controllers/roomController");
const { authAdmin, auth } = require("../middleware/auth");
app.get("/test", (req, res) => {
  res.send(test);
});
app.get("/getAllRooms", authAdmin, roomsController.getAllRooms);
app.post("/getRoomById", auth, roomsController.getRoomsById);
app.post("/getRoomsByUserId", auth, roomsController.getRoomsByUserId);
app.post("/create", authAdmin, roomsController.createRoom);
app.post("/update/:id", auth, roomsController.updateRoom);
app.post(
  "/getRoomsByGeneratorId",
  authAdmin,
  roomsController.getRoomsByGeneratorsId
);
module.exports = app;
