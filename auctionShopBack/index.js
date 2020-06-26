const express = require("express");
var cors = require("cors");
const query = require("./query");
const authMiddleware = require("./auth/middleware");

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
  res.json(await query.auctionList());
});

app.post("/auctions", authMiddleware, async (req, res) => {
  console.log("it works");
});

app.post("/auctions/:id/bid", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;
  const userId = req.body.userId;
  const createdBid = await query.createBid(id, userId, amount);
  res.json(createdBid);
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

const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
