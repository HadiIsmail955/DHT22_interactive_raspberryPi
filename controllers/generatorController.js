const { generator } = require("../models");

async function createGenerator(req, res) {
  try {
    const generatorData = req.body;
    delete generatorData.generateCooling;
    delete generatorData.generateHeating;
    const createdGenerator = await generator.create(generatorData);
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

    const [_, updatedGenerators] = await generator.update(updateData, {
      where: { id: generatorId },
      returning: true, // Get the updated records
    });

    if (updatedGenerators.length === 0) {
      return res.status(404).json({ error: "Generator not found" });
    }
    global.generators.forEach((generator) => {
      generator.updateGenerator();
    });
    res.status(200).json(await getGeneratorById(generatorId));
  } catch (error) {
    console.error("Error updating generator:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getAllGenerators() {
  try {
    const generators = await generator.findAll();
    return generators;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getAllGenerator(req, res) {
  try {
    const generators = await generator.findAll();
    res.status(200).json(generators);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}
async function getGeneratorById(generatorId) {
  try {
    const generatorFound = await generator.findByPk(generatorId);
    return generatorFound;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
}
async function getGeneratorsById(req, res) {
  try {
    const { generatorId } = req.body;
    const generatorFound = await generator.findByPk(generatorId);
    res.status(200).json(generatorFound);
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getGeneratorById(generatorId) {
  try {
    const generatorFound = await generator.findByPk(generatorId);
    return generatorFound;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
  }
}

module.exports = {
  createGenerator,
  updateGenerator,
  getAllGenerators,
  getAllGenerator,
  getGeneratorsById,
  getGeneratorById,
};
