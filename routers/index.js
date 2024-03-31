const experss = require("express");
const app = experss.Router();
const userRouter = require("./userRouter");
const roomRouter = require("./roomsRouter");
const generatorRouter = require("./generatorRouter");

app.get("/test", (req, res) => {
  res.send("test");
});
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/generator", generatorRouter);

module.exports = app;
