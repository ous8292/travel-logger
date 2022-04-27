//A router file that that has multiple routes to interact with the log entry document store
//desstructuring router out of express
const { Router } = require("express");

//pulling in log entry model to create new log entries
const LogEntry = require("../models/LogEntry");

//calling router
const router = Router();

router.get("/", async (req, res) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

//creating post route with error handling
router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
