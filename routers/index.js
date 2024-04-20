const experss = require("express");
const app = experss.Router();
const userRouter = require("./userRouter");
const roomRouter = require("./roomsRouter");
const generatorRouter = require("./generatorRouter");
const roomlogsRouter = require("./roomlogsRouter");
const generatorlogsRouter = require("./generatorlogRouter");

app.get("/test", (req, res) => {
  res.send("test");
});
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/generator", generatorRouter);
app.use("/roomlogs", roomlogsRouter);
app.use("/generatorlogs", generatorlogsRouter);
module.exports = app;
