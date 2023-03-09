const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/messages", require("./message.routes"));
router.use("/products", require("./product.routes"));
router.use("/users", require("./user.routes"));
module.exports = router;
