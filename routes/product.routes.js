const Product = require("../models/Product.model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProduct = { ...req.body };
    await Product.create(newProduct);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const newProduct = { ...req.body };
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
