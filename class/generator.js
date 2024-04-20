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
    const fetchRooms = async () => {
      return await roomController.getRoomsByGeneratorId(id);
    };
    fetchRooms().then((rooms) => {
      this.rooms = rooms.map((room) => {
        return new Room(
          room.id,
          room.roomName,
          room.temperature,
          room.humidity,
          room.fanSpeed,
          room.tolerance,
          room.priority,
          room.isLocked,
          room.isON,
          room.generateCooling,
          room.generateHeating,
          room.sensorPin,
          room.coolingPin,
          room.heatingPin
        );
      });

      // Start the generator after fetching rooms
      this.start();
    });
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
            console.log("found high")
              high.push(room);
              break;
            case 2:
            console.log("found medium")
              medium.push(room);
              break;
            case 3:
            console.log("found low")
              low.push(room);
          }
        } else room.setGeneratorOff();
      });
      console.log("high "+high)
      console.log("medium "+medium)
      console.log("low "+low)
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
    }, 10000);
  }
}

module.exports = generator;
