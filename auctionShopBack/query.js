const AuctionModel = require("./models").auction;
const BidModel = require("./models").bid;

async function itemList() {
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
module.exports.itemList = itemList;

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
  const newAuction = await AuctionModel.create({
    userId: userId,
    name: newName,
    minimum_bid: newMinimum,
    date_end: newEnd,
    description: newDewscription,
    image: newImage,
  });
  return newAuction;
}

module.exports.createAuction = createAuction;
