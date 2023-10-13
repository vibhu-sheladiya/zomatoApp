const express = require("express");
const { productController } = require("../../controllers");
const { upload } = require("../../middlewares/upload");
const router = express.Router();

// create item
router.post(
  "/create-product",
  // auth(),
  upload.single("product_image"),
  productController.createProduct
);

// get list item detail
router.get("/list", productController.getProductList);

module.exports = router;
