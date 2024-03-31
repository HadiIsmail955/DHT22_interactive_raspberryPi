const roomController = require("../controllers/roomController");
const generatorController = require("../controllers/generatorLogsController");
const Room = require("./room");
class generator {
  constructor(
    id,
    generatorName,
    generateCooling,
    generateHeating,
    coolingPin,
    heatingPin
  ) {
    this.id = id;
    this.generatorName = generatorName;
    this.generateCooling = generateCooling;
    this.generateHeating = generateHeating;
    this.coolingPin = coolingPin;
    this.heatingPin = heatingPin;
    const rooms = roomController.getRoomsByGeneratorId(id);
    this.rooms = [];
    rooms.forEach((room) => {
      this.rooms.push(new Room(room));
    });
    this.start();
  }
  start() {
    setInterval(() => {
      let updatedCooling = false;
      let updatedHeating = false;
      let high = [];
      let medium = [];
      let low = [];
      this.rooms.forEach((room) => {
        if (!room.isOffOrStable()) {
          const priority = room.getPriority;
          switch (priority) {
            case 1:
              high.push(room);
              break;
            case 2:
              medium.push(room);
              break;
            case 3:
              low.push(room);
          }
        } else room.setGeneratorOff();
      });
      if (high.length == 0) {
        if (medium.length == 0) {
          low?.forEach((room) => {
            room.increasePriority();
          });
        } else {
          medium?.forEach((room) => {
            room.increasePriority();
          });
          low?.forEach((room) => {
            room.increasePriority();
          });
        }
      }
      high?.forEach((room) => {
        if (room.isHot()) {
          room.generateCooling();
          updatedCooling = true;
        } else {
          room.generateHeating();
          updatedHeating = true;
        }
      });
      medium?.forEach((room) => {
        if (room.isHot()) {
          room.generateCooling();
          updatedCooling = true;
        } else {
          room.generateHeating();
          updatedHeating = true;
        }
      });
      low?.forEach((room) => {
        if (room.isHot()) {
          room.generateCooling();
          updatedCooling = true;
        } else {
          room.generateHeating();
          updatedHeating = true;
        }
      });
      this.rooms.forEach((room) => {
        room.start();
      });
      this.generateCooling = updatedCooling;
      this.generateHeating = updatedHeating;
      generatorController.createGeneratorLog(
        this.generateCooling,
        this.generateHeating,
        this.id
      );
    }, 1000);
  }
}

module.exports = generator;
