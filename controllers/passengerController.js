const passenger = require("../models/passenger");
const person = require("../models/person");
exports.createPassenger = async (req, res) => {
  try {
    const personInfo = await person.create({
      personFirstName: req.body.personFirstName,
      personLastName: req.body.personLastName,
    });
    const passengerCreated = await passenger.create({
      personInfo: personInfo.id,
    });
    res.status(201).send(passengerCreated);
  } catch (err) {
    res.status(500).send({
      error: "error creating passenger",
      errorMessage: err.message,
    });
  }
};
