const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth.js");
const User = require("./../models/User.model.js");
const fileUpload = require("../config/cloudinary.config");

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  try {
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }

    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);
    await User.create({
      username,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "The user was created." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }
    const foundUser = await User.findOne({ username }).select("password");
    if (!foundUser) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const matchingPasswords = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!matchingPasswords) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const token = jsonWebToken.sign(
      { id: foundUser._id },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ token, message: "Token created." });
  } catch (error) {
    next(error);
  }
});

router.get("/user", isAuth, async (req, res, next) => {
  res.json(req.user);
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const seller = await User.findById(req.params.id);
    res.status(200).json(seller);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/user",
  fileUpload.single("image"),
  isAuth,
  async (req, res, next) => {
    try {
      const newUser = {
        image: req.file?.path,
        username: req.body.username,
      };
      console.log(newUser);
      await User.findByIdAndUpdate(req.user._id, newUser);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
