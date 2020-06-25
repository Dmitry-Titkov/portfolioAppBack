"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "auction",
      [
        {
          auction_id: 1,
          user_id: 1,
          minimum_bid: 1,
          description: "Woah",
          date_end: new Date(),
          date_placed: new Date(),
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
    return queryInterface.bulkDelete("auction", null, {});
  },
};
