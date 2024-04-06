"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class generatorLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      generatorLogs.belongsTo(models.generator, { foreignKey: "generator_id" });
    }
  }
  generatorLogs.init(
    {
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
      modelName: "generatorLogs",
    }
  );
  return generatorLogs;
};
