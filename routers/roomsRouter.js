const experss = require("express");
const app = experss.Router();
const roomsController = require("../controllers/roomController");
app.get("/test", (req, res) => {
  res.send(test);
});
app.post("/create", roomsController.createRoom);
app.post("/update/:id", roomsController.updateRoom);
module.exports = app;
