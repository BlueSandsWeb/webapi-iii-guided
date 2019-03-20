const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// Middleware
function bouncer(req, res, next) {
  res
    .status(404)
    .json(
      "Does anyone else smell toast? 404 error, I can't remember what you're looking for"
    );
  // next(); don't do next after sending a response, it will give an error about the header already being set
}

function teamNamer(req, res, next) {
  req.team = "Web17"; // middleware can modify the request !!!!
  next(); // go ahead and execute the next middleware/route handler
}

function moodyGateKeeper(req, res, next) {
  if (Date.now() % 3 === 0) {
    res.status(403).send("YOU SHALL NOT PASS");
  } else {
    next();
  }
}

// server.use(bouncer);
server.use(express.json());
server.use(helmet());
server.use(teamNamer);
server.use(moodyGateKeeper);

// routing
server.use("/api/hubs", hubsRouter);

server.get("/", (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
