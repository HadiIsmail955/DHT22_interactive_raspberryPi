const mongoose = require("mongoose");
const generatorSchema = new mongoose.Schema(
  {
    generatorName: {
      type: String,
      required: [true, "require generator name"],
      unique: [true, "generator name most be unique"],
    },
    generateCooling: {
      type: Boolean,
      default: false,
    },
    generateHeating: {
      type: Boolean,
      default: false,
    },
    coolingPin: { type: Number, min: 0, required: [true, "add cooling pin"] },
    heatingPin: { type: Number, min: 0, required: [true, "add heating pin"] },
  },
  { timestamps: true }
);
const generator = mongoose.model("generator", generatorSchema);
module.exports = generator;
