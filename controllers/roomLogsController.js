const RoomLogs = require("../models/roomLogs");

// Controller function to create a new room log
async function createRoomLog({
  temperature,
  humidity,
  generateCooling,
  generateHeating,
  room_id,
}) {
  try {
    const createdRoomLog = await RoomLogs.create({
      temperature,
      humidity,
      generateCooling,
      generateHeating,
      room_id,
    });
    res.status(201).json(createdRoomLog);
  } catch (error) {
    console.error("Error creating room log:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createRoomLog };
