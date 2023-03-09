const router = require("express").Router();
const Message = require("../models/Message.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
