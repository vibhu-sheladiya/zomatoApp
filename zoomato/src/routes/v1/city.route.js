const express = require("express");
const { cityController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-city",
  // validate(userValidation.createUser),
  cityController.createCity
);

router.get("/list",cityController.getCityList );

router.get("/id/:cityId",cityController.getCityDetails);

router.put("/update/:cityId", cityController.updateCity);

router.delete(
  "/delete/:cityId", cityController.deleteCity
  
);
module.exports = router;
