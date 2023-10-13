const express = require("express");
const { orderController } = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-order",
  // validate(userValidation.createUser),
  orderController.createOrder
);

router.get("/list", orderController.getOrderList);

router.get("/id/:orderId", orderController.getOrderDetails);

router.put("/update/:orderId", orderController.updateOrder);

router.delete("/delete/:orderId", orderController.deleteOrder);
module.exports = router;
