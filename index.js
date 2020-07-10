const express = require("express");
const cors = require("cors");
const query = require("./query");
const authMiddleware = require("./auth/middleware");
const { PORT } = require("./config/constants");
const app = express();

app.use(cors());

const loggerMiddleWare = require("morgan");
app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

const authMiddleWare = require("./auth/middleware");

app.get("/", async (req, res) => {
  res.json(await query.itemListBids());
});

app.get("/review", async (req, res) => {
  res.json(await query.itemListReviews());
});

app.get("/user/:id", async (req, res) => {
  res.json(await query.retrieveUser(req.params.id));
});

app.get("/user", async (req, res) => {
  res.json(await query.checkUsers());
});

app.post("/auctions", authMiddleware, async (req, res) => {
  console.log("it works");
});

app.get("/search/:name", async (req, res) => {
  res.json(await query.retrieveItem(req.params.name));
});

app.post("/auctions/:id/bid", authMiddleware, async (req, res) => {
  const chosenAuctionId = req.params.id;
  const amount = req.body.newAmount;
  const userId = req.body.userId;
  const createdBid = await query.createBid(chosenAuctionId, amount, userId);
  res.json(createdBid);
});

app.post("/auctions/:id/review", authMiddleware, async (req, res) => {
  const auctionId = req.params.id;
  const rating = req.body.rating;
  const comment = req.body.comment;
  const userId = req.body.userId;
  const createReview = await query.createReview(
    auctionId,
    rating,
    comment,
    userId
  );
  res.json(createReview);
});

app.post("/auctions/:id/create", authMiddleware, async (req, res) => {
  const minimumBid = req.body.minimumBid;
  const userId = req.params.id;
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const date_end = req.body.date_end;
  const createAuction = await query.createAuction(
    userId,
    name,
    description,
    image,
    minimumBid,
    date_end
  );
  res.json(createAuction);
});

app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  const user = req.user;
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

const authRouter = require("./routers/auth");
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
