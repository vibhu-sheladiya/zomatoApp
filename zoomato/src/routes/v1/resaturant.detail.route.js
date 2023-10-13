const express = require("express");
const { restaurantController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-restaurant",
  // validate(userValidation.createUser),
  restaurantController.createRestaurant
);

router.get("/list", restaurantController.getRestaurantList);

router.get("/id/:restaurantId", restaurantController.getRestaurantDetails);

router.put("/update/:restaurantId", restaurantController.updateRestaurant);

router.delete("/delete/:restaurantId", restaurantController.deleteRestaurant);
module.exports = router;
