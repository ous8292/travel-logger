//importing middleware
const middlewares = require("./middlewares");

//importing logs router
const logs = require("./api/logs");

//calling in enviroment variables
require("dotenv").config();

//creating basic express app
const express = require("express");
const app = express();

//creating logger
const morgan = require("morgan");
app.use(morgan("common"));

//adds and removes headers in the application. (security reasons)
const helmet = require("helmet");
app.use(helmet());

//allows any origin to request from the backend
const cors = require("cors");
app.use(cors());

//setting up DB connextion
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

//for post request - body parse middleware
//only adding json since that is what we are working with
app.use(express.json());

//enforces only requests originating from 3000 can access backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//setting up error with JSON
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

//middleware -> using before notFound since we want it registered, but want it after all our middlewares
//when a request comes in for this route, it will go into logs and see if any of the routes match
app.use("/api/logs", logs);

//not found middleware - creates not found error, sets 404 status code, then forwards to actual error handler
app.use(middlewares.notFound);

//error handler middleware
app.use(middlewares.errorHandler);

//creating listener
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
