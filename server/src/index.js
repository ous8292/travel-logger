const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

//calling in enviroment variables
require("dotenv").config();

//importing middleware
const middlewares = require("./middlewares");
//importing logs router
const logs = require("./api/logs");

//creating basic express app
const app = express();

//creating logger
app.use(morgan("common"));

//adds and removes headers in the application. (security reasons)
app.use(helmet());

//allows any origin to request from the backend
app.use(cors());

console.log(process.env.DATABASE_URL);

//setting up DB connextion
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//for post request - body parser middleware
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
