const express = require("express");
const { userController } = require("../../controller");
// const { userValidation } = require("../../validation");
// const validate = require("../../middleware/validate");
const router = express.Router();
// create user
router.post(
  "/create-user",
  // validate(userValidation.createUser),
  userController.register
);

// router.get("/list", userController.register);

router.post("/login", userController.login);
// router.get("/id/:", rtypeController.getRestaurantTypeDetails);

// router.put("/update/:", rtypeController.updateRestaurantType);

// router.delete(
//   "/delete/:restauranttypeId",
//   rtypeController.deleteRestaurantType
// );
module.exports = router;
