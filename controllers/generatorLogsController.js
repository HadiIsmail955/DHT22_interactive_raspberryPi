const generatorLogs = require("../models").generatorLogs;

async function createGeneratorLog({
  generateCooling,
  generateHeating,
  generator_id,
}) {
  try {
    const createdGeneratorLog = await generatorLogs.create({
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


async function getAllGeneratorLogs(req, res) {
  try {
    const generatorLog = await generatorLogs.findAll();
    res.status(200).json(generatorLog);
  } catch (error) {
    console.error("Error fetching generators:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getGeneratorLogsByGeneratorId(req, res) {
  try {
    const generatorId = req.params.id;
    const GeneratorLog = await generatorLogs.findAll({where:{generator_id:generatorId}});
    return res.status(200).json(GeneratorLog);
  } catch (error) {
    console.error("Error fetching generators:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createGeneratorLog,getAllGeneratorLogs,getGeneratorLogsByGeneratorId };
