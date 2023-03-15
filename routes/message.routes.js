const router = require("express").Router();
const Message = require("../models/Message.model");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, async (req, res, next) => {
  try {
    const allMessages = await Message.find({ users: req.user.id })
      .populate("product")
      .populate("sendBy")
      .populate("sendTo");
    allMessages.forEach(async (message) => {
      if (!message.product) {
        await Message.findByIdAndDelete(message._id);
      }
    });
    res.status(200).json(allMessages);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const messages = await Message.find({ product: req.params.id })
      .populate("product")
      .populate("sendBy")
      .populate("sendTo");
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
