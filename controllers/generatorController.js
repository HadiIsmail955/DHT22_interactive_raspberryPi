const Generator = require("../models/generator");

async function createGenerator(req, res) {
  try {
    const generatorData = req.body;
    delete generatorData.generateCooling;
    delete generatorData.generateHeating;
    const createdGenerator = await Generator.create(generatorData);
    res.status(201).json(createdGenerator);
  } catch (error) {
    console.error("Error creating generator:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function updateGenerator(req, res) {
  try {
    const generatorId = req.params.id;
    const updateData = req.body;
    delete updateData.generatorName;

    const [_, updatedGenerators] = await Generator.update(updateData, {
      where: { id: generatorId },
      returning: true, // Get the updated records
    });

    if (updatedGenerators.length === 0) {
      return res.status(404).json({ error: "Generator not found" });
    }

    res.status(200).json(updatedGenerators[0]);
  } catch (error) {
    console.error("Error updating generator:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getAllGenerators(req, res) {
  try {
    const generators = await Generator.findAll();
    res.status(200).json(generators);
  } catch (error) {
    console.error("Error fetching generators:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createGenerator, updateGenerator, getAllGenerators };
