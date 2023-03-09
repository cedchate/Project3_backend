const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/message", require("./message.routes"));
router.use("/product", require("./product.routes"));
router.use("/user", require("./user.routes"));
module.exports = router;
