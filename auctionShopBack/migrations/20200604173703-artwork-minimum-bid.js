"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("artworks", "minimumBid", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("artworks", "minimumBid", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },
};
