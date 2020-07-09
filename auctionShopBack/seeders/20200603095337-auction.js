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
          description: "Catch the bad dreams!",
          date_end: new Date(),
          image:
            "https://www.artbarblog.com/wp-content/uploads/2015/09/DreamCatchers1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 1,
          name: "Tokyo at Night - Shimbashi",
          minimum_bid: 57.51,
          description:
            "Night photography of Shimbashi, bar district in Tokyo, after the rain.",
          date_end: new Date(),
          image: "https://i.redd.it/mef0k2qme3a01.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: 1,
          name: "Terrarium world",
          minimum_bid: 57.51,
          description:
            "Rather than just picking out an individual plant, consider gifting an entire tabletop garden — suitable for both those with and without experience with plants.",
          date_end: new Date(),
          image:
            "https://i.pinimg.com/originals/19/ab/bb/19abbb842438166c77537596d9274ad7.jpg",
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
