"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class generator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  generator.init(
    {
      generatorName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      generateCooling: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "generator",
    }
  );
  return generator;
};
