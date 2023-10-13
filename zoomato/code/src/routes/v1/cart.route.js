const express = require("express");
const { cartController } = require("../../controllers");
// const validate = require("../../middlewares/validate");
// const { cartValidation } = require("../../validations");

const router = express.Router();

// create book
router.post(
  "/create-cart",
  // validate(cartValidation.createCarts),
  cartController.createCart
);

// get list book detail
router.get("/list", cartController.getCartList);

// get Book details By Id
router.get("/get-details/:cartId", cartController.getCartDetailsById);

// delete book
router.delete("/delete-cart/:cartId", cartController.deleteCartById);

router.put("/update-cart/:cartId", cartController.updateCart);

module.exports = router;
