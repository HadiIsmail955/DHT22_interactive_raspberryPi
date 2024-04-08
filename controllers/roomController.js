const Room = require("../models").rooms; // Import the Sequelize Room model

async function createRoom(req, res) {
  try {
    const roomData = req.body;
    const createdRoom = await Room.create(roomData);
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error("Error creating room:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function updateRoom(req, res) {
  try {
    const roomId = req.params.id;
    const updateData = req.body;
    delete updateData.roomName;

    const [_, updatedRooms] = await Room.update(updateData, {
      where: { id: roomId },
      returning: true, // Get the updated records
    });

    if (updatedRooms.length === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(updatedRooms[0]);
  } catch (error) {
    console.error("Error updating room:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getRoomById(roomId) {
  try {
    const room = await Room.findByPk(roomId);
    return room;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
}

async function getRoomsByGeneratorId(generatorId) {
  try {
    const rooms = await Room.findAll({ where: { generator_id: generatorId } });
    return rooms;
  } catch (error) {
    console.error("Error fetching rooms by generator ID:", error);
    throw error;
  }
}

module.exports = { createRoom, updateRoom, getRoomById, getRoomsByGeneratorId };
