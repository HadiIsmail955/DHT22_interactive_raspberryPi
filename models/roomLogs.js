const mongoose = require("mongoose");
const roomLogsSchema = new mongoose.Schema(
  {
    temperature: { type: Number, min: 15, max: 32 },
    humidity: { type: Number, min: 30, max: 60 },
    generateCooling: {
      type: Boolean,
      default: false,
    },
    generateHeating: {
      type: Boolean,
      default: false,
    },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "rooms" },
  },
  { timestamps: true }
);
const roomLogs = mongoose.model("roomLogs", roomLogsSchema);
module.exports = roomLogs;
