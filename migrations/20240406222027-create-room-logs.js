"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roomLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      temperature: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 15,
          max: 32,
        },
      },
      humidity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 30,
          max: 60,
        },
      },
      generateCooling: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
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
    await queryInterface.dropTable("roomLogs");
  },
};
