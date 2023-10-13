const { foodGalleryService } = require("../service");
const fs = require("fs");
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.fimg = req.file.filename;
    } else {
      throw new Error("product image is required");
    }
    const createProduct = await foodGalleryService.createGallery(reqBody);
    res.status(201).json({
      message: "success",
      data: createProduct,
      success: true,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message: error?.message || "something went ro wrong, please try again",
    });
  }
};

const getProductList = async (req, res) => {
  try {
    let product = await foodGalleryService.getList(req, res);
    res.status(200).json({
      data: product,
      // message:'success',
      // success:true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProductId = async (req, res) => {
  try {
    const product = await foodGalleryService.getGalleryById(
      req.params.galleryId
    );
    if (!product) {
      throw new Error("not found");
    }
    res.status(200).json({
      data: { product },
      message: "success",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const galleryId = req.params.galleryId;
    const product = await foodGalleryService.getProductId(galleryId);
    if (!product) {
      throw new Error("Not Found");
    }
    await productService.deleteProduct(galleryId);
    res.status(200).json({
      data: product,
      message: "success",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const galleryId = req.params.galleryId;
    const productEx = await foodGalleryService.getProductId(galleryId);
    if (!orderEx) {
      throw new Error("product does not exist");
    }
    await foodGalleryService.updateGallery(galleryId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { productEx },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getProductList,
  getProductId,
  deleteProduct,
  updateProduct,
};
