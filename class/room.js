const Gpio = require("onoff").Gpio;
const roomController = require("../controllers/roomController");
const roomLogsController = require("../controllers/roomLogsController");
const readSensor = require("../controllers/helperfunction/readSensor");
const { set } = require("mongoose");
class room {
  constructor(
    id,
    roomName,
    temperature,
    humidity,
    fanSpeed,
    tolerance,
    priority,
    isLocked,
    isON,
    generateCooling,
    generateHeating,
    sensorPin,
    coolingPin,
    heatingPin
  ) {
    this.id = id;
    this.roomName = roomName;
    this.temperature = temperature;
    this.humidity = humidity;
    this.fanSpeed = fanSpeed;
    this.tolerance = tolerance;
    let newPriorty;
    if (priority == "low") newPriorty = 3;
    else if (priority == "high") newPriorty = 1;
    else newPriorty = 2;
    this.priority = newPriorty;
    this.isLocked = isLocked;
    this.isON = isON;
    this.generateCooling = false;
    this.generateHeating = false;
    this.sensorPin = sensorPin;
    this.coolingPin = coolingPin;
    this.heatingPin = heatingPin;
    this.coolingPath = new Gpio(coolingPin, "out");
    this.heatingPath = new Gpio(heatingPin, "out");
    this.currentTemperature = 12;
    this.currentHumidity = 15;
    this.increasePriority = 0;
  }
  isOffOrStable() {
    console.log(
      "is stable " + !this.isON + " room id " + this.id + " " + this.isStable()
    );
    if (!this.isON) return true;
    return this.isStable();
  }
  isStable() {
    console.log(
      "*****room " +
        this.id +
        " t " +
        this.temperature +
        " c " +
        this.currentTemperature
    );
    console.log(
      this.temperature + this.tolerance >= this.currentTemperature &&
        this.temperature - this.tolerance <= this.currentTemperature
    );
    if (
      this.temperature + this.tolerance >= this.currentTemperature &&
      this.temperature - this.tolerance <= this.currentTemperature
    )
      return true;
    return false;
  }

  setOff() {
    this.isON = false;
  }
  setON() {
    if (!this.isON) {
      this.isON = true;
      this.getUpdate();
      this.resetPrioity();
      this.generateCooling = false;
      this.generateCooling = false;
    }
  }
  isHot() {
    return this.temperature < this.currentTemperature;
  }
  generateCoolingforRoom() {
    this.generateCooling = true;
    this.generateHeating = false;
  }
  generateHeatingforRoom() {
    this.generateCooling = false;
    this.generateHeating = true;
  }
  setGeneratorOff() {
    this.generateCooling = false;
    this.generateHeating = false;
  }
  getUpdate() {
    const updateRroom = roomController.getRoomById(this.id);
    if (updateRroom) {
      this.temperature = updateRroom.temperature;
      this.humidity = updateRroom.humidity;
      this.fanSpeed = updateRroom.fanSpeed;
      this.tolerance = updateRroom.tolerance;
      let newPriorty;
      if (updateRroom.priority == "low") newPriorty = 3;
      else if (updateRroom.priority == "high") newPriorty = 1;
      else newPriorty = 2;
      this.priority = newPriorty;
      this.isLocked = updateRroom.isLocked;
      this.isON = updateRroom.isON;
      this.sensorPin = updateRroom.sensorPin;
      this.coolingPin = updateRroom.coolingPin;
      this.heatingPin = updateRroom.heatingPin;
      this.coolingPath = new Gpio(coolingPin, "out");
      this.heatingPath = new Gpio(heatingPin, "out");
    } else this.setOff;
  }
  getPriority() {
    const priority = this.priority - this.increasePriority;
    if (priority <= 0) return 1;
    else if (priority > 3) return 3;
    else return priority;
  }
  resetPrioity() {
    this.increasePriority = 0;
  }
  increasePriorityofroom() {
    this.increasePriority += 1;
  }
  increasePrioritytohigh() {
    this.increasePriority = this.priority - 1;
  }
  calculateWorkingTimePersecond() {
    return 5000 / this.getPriority();
  }
  start() {
    this.readSensor();
    this.turnPath(this.calculateWorkingTimePersecond());
    roomLogsController.createRoomLog({
      temperature: this.currentTemperature,
      humidity: this.currentHumidity,
      generateCooling: this.generateCooling,
      generateHeating: this.generateHeating,
      room_id: this.id,
    });
    this.resetPrioity();
  }
  readSensor() {
    readSensor(this.sensorPin)
      .then((data) => {
        console.log(data);
        this.currentTemperature = data.temperature;
        this.currentHumidity = data.humidity;
      })
      .catch((error) => {
        this.setOff();
      });
  }
  turnPath(time) {
    if (this.generateCooling) this.coolingPath.writeSync(1);
    if (this.generateHeating) this.heatingPath.writeSync(1);
    setTimeout(() => {
      this.coolingPath.writeSync(0);
      this.heatingPath.writeSync(0);
    }, time);
  }

  toString() {
    return `Room ID: ${this.id}, Room Name: ${this.roomName}, Temperature: ${this.temperature}°C, Humidity: ${this.humidity}%, Fan Speed: ${this.fanSpeed}, Priority: ${this.priority}, Is Locked: ${this.isLocked}, Is ON: ${this.isON}, Generate Cooling: ${this.generateCooling}, Generate Heating: ${this.generateHeating}, Sensor Pin: ${this.sensorPin}, Cooling Pin: ${this.coolingPin}, Heating Pin: ${this.heatingPin}`;
  }
}

module.exports = room;
