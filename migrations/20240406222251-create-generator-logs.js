"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("generatorLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      generateCooling: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "generators",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("generatorLogs");
  },
};
