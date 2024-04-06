const GeneratorLogs = require("../models/generatorLogs");

async function createGeneratorLog({
  generateCooling,
  generateHeating,
  generator_id,
}) {
  try {
    const createdGeneratorLog = await GeneratorLog.create({
      generateCooling,
      generateHeating,
      generator_id,
    });
    return createdGeneratorLog;
  } catch (error) {
    console.error("Error creating generator log:", error);
    throw new Error("Error creating generator log");
  }
}

module.exports = { createGeneratorLog };
