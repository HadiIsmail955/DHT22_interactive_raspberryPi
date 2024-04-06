"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rooms.belongsTo(models.user, { foreignKey: "user_id" });
      rooms.belongsTo(models.generator, { foreignKey: "generator_id" });
    }
  }
  rooms.init(
    {
      roomName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 28,
        validate: {
          min: 15,
          max: 32,
        },
      },
      humidity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
        validate: {
          min: 30,
          max: 60,
        },
      },
      fanSpeed: {
        type: DataTypes.ENUM("low", "medium", "high", "auto"),
        defaultValue: "low",
      },
      tolerance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 0.1,
          max: 5,
        },
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isON: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      generateCooling: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sensorPin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      coolingPin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      heatingPin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "rooms",
    }
  );
  return rooms;
};
