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
    if (!this.isON) return true;
    return this.isStable();
  }
  isStable() {
    if (
      this.temperature + this.tolerance >= this.currentTemperature ||
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
  generateCooling() {
    this.generateCooling = true;
    this.generateHeating = false;
  }
  generateHeating() {
    this.generateCooling = false;
    this.generateHeating = true;
  }
  setGeneratorOff() {
    this.generateCooling = false;
    this.generateHeating = false;
  }
  get getUpdate() {
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
      if (this.coolingPin != updateRroom.coolingPin)
        this.coolingPath = new Gpio(coolingPin, "out");
      if (this.heatingPin != updateRroom.heatingPin)
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
  increasePriority() {
    this.increasePriority += 1;
  }
  increasePrioritytohigh() {
    this.increasePriority = this.priority - 1;
  }
  calculateWorkingTimePersecond() {
    return 1000 / this.getPriority();
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
    const data = readSensor(this.sensorPin);
    if (data) {
      this.temperature = data.temperature;
      this.humidity = data.humidity;
    } else {
      this.setOff();
    }
  }
  turnPath(time) {
    LED.writeSync(1);
    setTimeout(() => {
      LED.writeSync(0);
    }, 1000);
  }
}

module.exports = room;
