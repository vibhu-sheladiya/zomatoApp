const express = require("express");
const { galleryController } = require("../../controller");
const { upload } = require("../../middlewares/upload");
const router = express.Router();

// create item
router.post(
  "/create-product",
  // auth(),
  upload.single("fimg"),
  galleryController.createProduct
);

// get list item detail
router.get("/list", galleryController.getProductList);

module.exports = router;
