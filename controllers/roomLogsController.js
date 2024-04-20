const {roomLogs}= require("../models");
// Controller function to create a new room log
async function createRoomLog({
  temperature,
  humidity,
  generateCooling,
  generateHeating,
  room_id,
}) {
  try {
    const createdRoomLog = await roomLogs.create({
      temperature,
      humidity,
      generateCooling,
      generateHeating,
      room_id,
    });
    return createdRoomLog;
  } catch (error) {
    console.error("Error creating room log:", error);
    throw error; // Propagate the error to the caller
  }
}

async function getAllRoomLogs(req, res) {
  try {
    const roomLog = await roomLogs.findAll();
    res.status(200).json(roomLog);
  } catch (error) {
    console.error("Error fetching generators:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getRoomLogsByRoomID(req, res) {
  try {
    const roomId = req.params.id;
    const roomLog = await roomLogs.findAll({where:{room_id:roomId}});
    return res.status(200).json(roomLog);
  } catch (error) {
    console.error("Error fetching generators:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createRoomLog,getRoomLogsByRoomID};
