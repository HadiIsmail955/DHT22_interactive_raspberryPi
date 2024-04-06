"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roomLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roomLogs.belongsTo(models.rooms, { foreignKey: "room_id" });
    }
  }
  roomLogs.init(
    {
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 15,
          max: 32,
        },
      },
      humidity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 30,
          max: 60,
        },
      },
      generateCooling: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "roomLogs",
    }
  );
  return roomLogs;
};
