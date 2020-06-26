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
  res.json(await query.auction());
});

app.post("/auctions", authMiddleware, async (req, res) => {
  console.log("it works");
});

app.post("/auctions/:id/bid", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;
  const createdBid = await query.createBid(id, amount);
  res.json(createdBid);
});

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
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

// Listen for connections on specified port (default is port 4000)
const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
