const AuctionModel = require("./models").auction;
const BidModel = require("./models").bid;

async function auctionList() {
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

    const listOfAuctions = rows.map((element) => {
      return element.get({ plain: true });
    });
    return listOfAuctions;
  } catch (e) {
    console.error(e);
  }
}
module.exports.auctionList = auctionList;

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

async function createBid(chosenAuctionId, newAmount) {
  try {
    const auction = await retrieveAuction(chosenAuctionId);
    const amounts = artwork.bids.map((element) => {
      return element.amount;
    });
    const highestAmount = Math.max(0, artwork.minimum_bid, ...amounts);
    if (newAmount <= highestAmount) {
      console.error("the value is too small");
    } else {
      const newBid = await BidModel.create({
        auction_id: chosenAuctionId,
        amount: newAmount,
      });
      return newBid;
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports.createBid = createBid;
