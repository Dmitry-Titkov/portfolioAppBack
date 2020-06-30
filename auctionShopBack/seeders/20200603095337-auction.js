"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "auctions",
      [
        {
          id: 1,
          userId: 1,
          name: "Chia",
          minimum_bid: 1,
          description: "Woah",
          date_end: new Date(),
          image:
            "https://image.shutterstock.com/image-illustration/chinese-style-fantasy-scenes3d-rendering-600w-647884516.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("auctions", null, {});
  },
};
