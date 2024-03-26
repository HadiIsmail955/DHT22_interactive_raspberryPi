const dhtSensor = require('node-dht-sensor');

const sensorType = 22;

async function readSensor(sensorPin) {
  const readout = await dhtSensor.read(sensorType, sensorPin)
	    if (readout.temperature !== null && readout.humidity !== null) {
		console.log(`pin: ${sensorPin} Temperature: ${readout.temperature.toFixed(1)}°C, Humidity: ${readout.humidity.toFixed(1)}%`);
	  } else {
		console.error("Failed to read sensor!");
	  }
		}
	
module.exports = readSensor;
