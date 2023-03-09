const router = require("express").Router();
const Message = require("../models/Message.model");

router.get("/", async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const payload = jsonWebToken.verify(token, process.env.TOKEN_SECRET);
    const allMessages = await Message.find({ seller: payload.id });
    res.json("All good in here");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
