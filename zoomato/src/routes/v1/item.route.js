const express = require("express");
const { itemController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-item",
  // validate(userValidation.createUser),
  itemController.createItem
);

router.get("/list", itemController.getItemList);

router.get("/id/:itemId", itemController.getItemDetails);

router.put("/update/:itemId", itemController.updateItem);

router.delete("/delete/:itemId", itemController.deleteItem);
module.exports = router;
