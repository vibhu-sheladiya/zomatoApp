const express = require("express");

const userRoute = require("./user.route");
const cityRoute = require("./city.route");
// const galleryRoute = require("./food.gallery.route");
const itemRoute = require("./item.route");
const orderRoute = require("./order.route");
const ownerRoute = require("./owner.route");
const restaurantRoute = require("./resaturant.detail.route");
const rtypeRoute = require("./resaturant.type.route");
const stateRoute = require("./state.route");
const tokenRoute = require("./token.route");
// const userSettingRoute = require("./usersetting.route");
// const userRoute = require("./user.route");

const router = express.Router();

router.use("/restype", rtypeRoute);
router.use("/user", userRoute);
router.use("/token", tokenRoute);
router.use("/city", cityRoute);
router.use("/order", orderRoute);
router.use("/item", itemRoute);
router.use("/owner", ownerRoute);
router.use("/resaturant", restaurantRoute);
router.use("/state", stateRoute);

module.exports = router;
