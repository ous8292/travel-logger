//A router file that that has multiple routes to interact with the log entry document store
//desstructuring router out of express
const { Router } = require("express");

//calling router
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "🌎",
  });
});

//creating post route
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
