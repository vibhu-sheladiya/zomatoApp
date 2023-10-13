const express = require("express");
const { rtypeController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-type",
  // validate(userValidation.createUser),
  rtypeController.createRestaurantTypec
);

router.get("/list", rtypeController.getRestaurantTypeList);

router.get("/id/:restauranttypeId", rtypeController.getRestaurantTypeDetails);

router.put("/update/:restauranttypeId", rtypeController.updateRestaurantType);

router.delete(
  "/delete/:restauranttypeId",
  rtypeController.deleteRestaurantType
);
module.exports = router;
