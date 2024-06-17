const roomController = require("../controllers/roomController");
const generatorController = require("../controllers/generatorController");
const generatorControllerLogs = require("../controllers/generatorLogsController");
const Room = require("./room");
const Gpio = require("onoff").Gpio;
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
    this.coolingPath = new Gpio(coolingPin, "out");
    this.heatingPath = new Gpio(heatingPin, "out");
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
      //this.rooms.map((room)=>{console.log(room.toString())})
      // Start the generator after fetching rooms
      this.start();
    });
  }
  updateGenerator() {
    const generatorInfo = generatorController.getGeneratorById(this.id);
    this.generatorName = generatorInfo.generatorName;
    this.generateCooling = generatorInfo.generateCooling;
    this.generateHeating = generatorInfo.generateHeating;
    this.coolingPin = generatorInfo.coolingPin;
    this.heatingPin = generatorInfo.heatingPin;
    this.coolingPath = new Gpio(generatorInfo.coolingPin, "out");
    this.heatingPath = new Gpio(generatorInfo.heatingPin, "out");
    const fetchRooms = async () => {
      return await roomController.getRoomsByGeneratorId(this.id);
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
    });
  }
  updateRooms() {
    this.rooms.forEach((room) => {
      room.getUpdate();
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
        //console.log(room.toString())
        // console.log(" room "+!room.isOffOrStable())
        if (!room.isOffOrStable()) {
          // console.log("entered room "+!room.isOffOrStable())
          const priority = room.getPriority();
          switch (priority) {
            case 1:
              // console.log("found high")
              high.push(room);
              break;
            case 2:
              // console.log("found medium")
              medium.push(room);
              break;
            case 3:
              // console.log("found low")
              low.push(room);
          }
        } else room.setGeneratorOff();
      });
      // console.log("high "+high)
      // console.log("medium "+medium)
      // console.log("low "+low)
      // console.log(low)
      if (high.length == 0) {
        if (medium.length == 0) {
          low?.forEach((room) => {
            // console.log(room.toString())
            room.increasePrioritytohigh();
          });
        } else {
          medium?.forEach((room) => {
            room.increasePriorityofroom();
          });
          low?.forEach((room) => {
            // console.log(room.toString())
            room.increasePriorityofroom();
          });
        }
      }
      high?.forEach((room) => {
        if (room.isHot()) {
          room.generateCoolingforRoom();
          updatedCooling = true;
        } else {
          room.generateHeatingforRoom();
          updatedHeating = true;
        }
      });
      medium?.forEach((room) => {
        if (room.isHot()) {
          room.generateCoolingforRoom();
          updatedCooling = true;
        } else {
          room.generateHeatingforRoom();
          updatedHeating = true;
        }
      });
      low?.forEach((room) => {
        if (room.isHot()) {
          room.generateCoolingforRoom();
          updatedCooling = true;
        } else {
          room.generateHeatingforRoom();
          updatedHeating = true;
        }
      });
      console.log(
        "updatedCooling " + updatedCooling + " updatedHeating " + updatedHeating
      );
      this.generateCooling = updatedCooling;
      this.generateHeating = updatedHeating;
      this.turnPath(10000);
      this.rooms.forEach((room) => {
        room.start();
      });
      generatorControllerLogs.createGeneratorLog(
        this.generateCooling,
        this.generateHeating,
        this.id
      );
    }, 10000);
  }

  turnPath(time) {
    console.log(
      "this.generateCooling " +
        this.generateCooling +
        " this.generateHeating " +
        this.generateHeating
    );
    if (this.generateCooling) this.coolingPath.writeSync(1);
    if (this.generateHeating) this.heatingPath.writeSync(1);
    setTimeout(() => {
      this.coolingPath.writeSync(0);
      this.heatingPath.writeSync(0);
    }, time);
  }
}
module.exports = generator;
