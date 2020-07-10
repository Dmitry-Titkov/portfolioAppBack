const AuctionModel = require("./models").auction;
const BidModel = require("./models").bid;
const UserModel = require("./models").user;
const ReviewModel = require("./models").review;
const { Op } = require("sequelize");

async function itemListBids() {
  try {
    const criteria = {
      include: [
        {
          model: BidModel,
          as: "bids",
        },
      ],
    };

    const rows = await AuctionModel.findAll(criteria);

    const plainArt = rows.map((element) => {
      return element.get({ plain: true });
    });
    return plainArt;
  } catch (e) {
    console.error(e);
  }
}
module.exports.itemListBids = itemListBids;

async function itemListReviews() {
  try {
    const criteria = {
      include: [
        {
          model: ReviewModel,
          as: "reviews",
        },
      ],
    };

    const rows = await AuctionModel.findAll(criteria);

    const plainArt = rows.map((element) => {
      return element.get({ plain: true });
    });
    return plainArt;
  } catch (e) {
    console.error(e);
  }
}
module.exports.itemListReviews = itemListReviews;

async function retrieveUser(id) {
  try {
    const row = await UserModel.findByPk(id, {
      include: [
        {
          model: AuctionModel,
          as: "auctions",
        },
        { model: ReviewModel, as: "reviews" },
        { model: BidModel, as: "bids" },
      ],
    });

    return row.get({ plain: true });
  } catch (e) {
    console.error(e);
  }
}

module.exports.retrieveUser = retrieveUser;

async function checkUsers() {
  try {
    const row = await UserModel.findAll();

    const users = row.map((element) => {
      return element.get({ plain: true });
    });
    return users;
  } catch (e) {
    console.error(e);
  }
}

module.exports.checkUsers = checkUsers;

async function UsersAuctions(id) {
  try {
    const row = await UserModel.findByPk(id, {
      include: [
        {
          model: AuctionModel,
          as: "auctions",
        },
      ],
    });

    return row.get({ plain: true });
  } catch (e) {
    console.error(e);
  }
}

module.exports.UsersAuctions = UsersAuctions;

async function retrieveItem(name) {
  var options = {
    where: {
      name: {
        [Op.like]: "%" + name + "%",
      },
    },
    include: BidModel,
  };
  try {
    const rows = await AuctionModel.findAll(options);
    return rows.map((element) => {
      return element.get({ plain: true });
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports.retrieveItem = retrieveItem;

async function retrieveAuction(id) {
  try {
    const row = await AuctionModel.findByPk(id, {
      include: [
        {
          model: BidModel,
          as: "bids",
        },
      ],
    });

    return row.get({ plain: true });
  } catch (e) {
    console.error(e);
  }
}
module.exports.retrieveAuction = retrieveAuction;

async function createBid(chosenAuctionId, newAmount, userId) {
  try {
    const auction = await retrieveAuction(chosenAuctionId);
    const amounts = auction.bids.map((element) => {
      return element.amount;
    });
    const highestAmount = Math.max(0, auction.minimumBid, ...amounts);
    if (newAmount <= highestAmount) {
      console.error("the value is too small");
    } else {
      const newBid = await BidModel.create({
        auctionId: chosenAuctionId,
        amount: newAmount,
        userId: userId,
      });
      return newBid;
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports.createBid = createBid;

async function createAuction(
  userId,
  newName,
  newDewscription,
  newImage,
  newMinimum,
  newEnd
) {
  try {
    const newAuction = await AuctionModel.create({
      userId: userId,
      name: newName,
      minimum_bid: newMinimum,
      date_end: newEnd,
      description: newDewscription,
      image: newImage,
    });
    return newAuction;
  } catch (e) {
    console.error(e);
  }
}

module.exports.createAuction = createAuction;

async function createReview(auctionId, rating, comment, userId) {
  try {
    const newReview = await ReviewModel.create({
      userId: userId,
      auctionId: auctionId,
      rating: rating,
      comment: comment,
    });
    return newReview;
  } catch (e) {
    console.error(e);
  }
}

module.exports.createReview = createReview;
