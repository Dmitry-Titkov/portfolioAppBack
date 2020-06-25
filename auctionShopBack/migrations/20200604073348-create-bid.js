"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("bids", {
      bid_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      auction_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        eferences: {
          model: "auctions",
          key: "auction_id",
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        eferences: {
          model: "users",
          key: "user_id",
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("bids");
  },
};
