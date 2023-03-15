const Product = require("../models/Product.model");
const router = require("express").Router();
const isAuth = require("./../middlewares/isAuth");
const fileUpload = require("../config/cloudinary.config");

// /api/products

router.get("/", async (req, res, next) => {
  const query = {
    category: req.query.category,
  };

  if (!req.query.category) {
    delete query.category;
  }
  try {
    const Products = await Product.find(query);
    res.json(Products);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try {
    const query = {
      category: req.query.category,
      seller: req.params.userId,
    };
    if (!req.query.category) {
      delete query.category;
    }
    const allProduct = await Product.find(query).populate("seller");
    res.status(200).json(allProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  isAuth,
  fileUpload.single("picture"),
  async (req, res, next) => {
    try {
      const newProduct = {
        ...req.body,
        seller: req.user._id,
        picture: req.file?.path,
      };
      await Product.create(newProduct);
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  isAuth,
  fileUpload.single("picture"),
  async (req, res, next) => {
    try {
      const newProduct = {
        ...req.body,
        seller: req.user._id,
        picture: req.file?.path,
      };
      await Product.findByIdAndUpdate(req.params.id, newProduct);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
