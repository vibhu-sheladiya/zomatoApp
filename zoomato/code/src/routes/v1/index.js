const express = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const tokenRoute = require("./token.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/token", tokenRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);

module.exports = router;
