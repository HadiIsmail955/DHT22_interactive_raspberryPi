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
    const updatedGenerator = await Generator.findByIdAndUpdate(
      generatorId,
      updateData,
      { new: true }
    );
    if (!updatedGenerator) {
      return res.status(404).json({ error: "Generator not found" });
    }
    res.status(200).json(updatedGenerator);
  } catch (error) {
    console.error("Error updating generator:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}
async function getAllGenerators() {
  try {
    const generators = await Generator.find();
    return generators;
  } catch (error) {
    console.error("Error fetching generators:", error);
    throw error;
  }
}

module.exports = { createGenerator, updateGenerator, getAllGenerators };
