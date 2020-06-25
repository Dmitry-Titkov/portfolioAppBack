const ArtworkModel = require("./models").artwork;
const BidModel = require("./models").bid;

async function artList() {
  try {
    const criteria = {
      include: [
        {
          model: BidModel,
          as: "bids",
        },
      ],
    };

    const rows = await ArtworkModel.findAll(criteria);

    const plainArt = rows.map((element) => {
      return element.get({ plain: true });
    });
    return plainArt;
  } catch (e) {
    console.error(e);
  }
}
module.exports.artList = artList;

async function retrieveArtwork(id) {
  try {
    const row = await ArtworkModel.findByPk(id, {
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
module.exports.retrieveArtwork = retrieveArtwork;

async function likeArtwork(id) {
  try {
    const row = await ArtworkModel.findByPk(id);
    const incrementResult = await row.increment("likes");
    return incrementResult.likes;
  } catch (e) {
    console.error(e);
  }
}
module.exports.likeArtwork = likeArtwork;

async function createBid(chosenArtworkId, newEmail, newAmount) {
  try {
    const artwork = await retrieveArtwork(chosenArtworkId);
    const amounts = artwork.bids.map((element) => {
      return element.amount;
    });
    const highestAmount = Math.max(0, artwork.minimumBid, ...amounts);
    if (newAmount <= highestAmount) {
      console.error("the value is too small");
    } else {
      const newBid = await BidModel.create({
        artworkId: chosenArtworkId,
        email: newEmail,
        amount: newAmount,
      });
      return newBid;
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports.createBid = createBid;
