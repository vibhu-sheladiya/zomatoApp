const express = require("express");
const { ownerController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-owner",
  // validate(userValidation.createUser),
  ownerController.createOwner
);

router.get("/list", ownerController.getOwnerList);

router.get("/id/:ownerId", ownerController.getOwnerDetails);

router.put("/update/:ownerId", ownerController.updateOwner);

router.delete("/delete/:ownerId", ownerController.deleteOwner);
module.exports = router;
