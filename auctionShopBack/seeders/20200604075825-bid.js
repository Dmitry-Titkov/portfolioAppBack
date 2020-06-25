"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "test@test.com",
          artworkId: 1,
          amount: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test@test.com",
          artworkId: 2,
          amount: 125,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test@test.com",
          artworkId: 1,
          amount: 425,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test@test.com",
          artworkId: 2,
          amount: 376,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test@test.com",
          artworkId: 1,
          amount: 134,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bids", null, {});
  },
};
