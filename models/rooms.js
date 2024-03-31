const mongoose = require("mongoose");
const roomsSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: [true, "require room name"],
      unique: [true, "room name most be unique"],
    },
    temperature: { type: Number, min: 15, max: 32, default: 28 },
    humidity: { type: Number, min: 30, max: 60, default: 50 },
    fanSpeed: {
      type: String,
      enum: ["low", "medium", "high", "auto"],
      default: "low",
    },
    tolerance: { type: Number, min: 0.1, max: 5, default: 1 },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isLocked: { type: Boolean, default: false },
    isON: { type: Boolean, default: false },
    generateCooling: {
      type: Boolean,
      default: false,
    },
    generateHeating: {
      type: Boolean,
      default: false,
    },
    sensorPin: { type: Number, min: 0, required: [true, "add sensor pin"] },
    coolingPin: { type: Number, min: 0, required: [true, "add cooling pin"] },
    heatingPin: { type: Number, min: 0, required: [true, "add heating pin"] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    generator_id: { type: mongoose.Schema.Types.ObjectId, ref: "generator" },
  },
  { timestamps: true }
);

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;
