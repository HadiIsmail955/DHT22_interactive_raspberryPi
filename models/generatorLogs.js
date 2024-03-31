const mongoose = require("mongoose");
const generatorLogsSchema = new mongoose.Schema(
  {
    generateCooling: {
      type: Boolean,
      default: false,
    },
    generateHeating: {
      type: Boolean,
      default: false,
    },
    generator_id: { type: mongoose.Schema.Types.ObjectId, ref: "generator" },
  },
  { timestamps: true }
);
const generatorLogs = mongoose.model("generatorLogs", generatorLogsSchema);
module.exports = generatorLogs;
