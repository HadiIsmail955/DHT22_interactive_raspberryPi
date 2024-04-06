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
    const createdRoomLog = await RoomLog.create({
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

module.exports = { createRoomLog };
