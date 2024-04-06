"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      temperature: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 28,
        validate: {
          min: 15,
          max: 32,
        },
      },
      humidity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50,
        validate: {
          min: 30,
          max: 60,
        },
      },
      fanSpeed: {
        type: Sequelize.ENUM("low", "medium", "high", "auto"),
        defaultValue: "low",
      },
      tolerance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 0.1,
          max: 5,
        },
      },
      priority: {
        type: Sequelize.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
      isLocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isON: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generateCooling: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generateHeating: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sensorPin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      coolingPin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      heatingPin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
    await queryInterface.dropTable("rooms");
  },
};
