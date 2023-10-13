const { productService } = require("../services");
const fs = require("fs");
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.product_image = req.file.filename;
    } else {
      throw new Error("product image is required");
    }
    const createProduct = await productService.createProduct(reqBody);
    res.status(201).json({
      message: "success",
      data: createProduct,
      success: true,
    });
  } catch (error) {
    res
      .status(error?.statusCode || 400)
      .json({
        success: false,
        message: error?.message || "something went ro wrong, please try again",
      });
  }
};

const getProductList = async (req, res) => {
  try {
    let product = await productService.productList(req, res);
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
    const product = await productService.getProductId(req.params.ProductId);
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
    const ProductId = req.params.ProductId;
    const product = await productService.getProductId(ProductId);
    if (!product) {
      throw new Error("Not Found");
    }
    await productService.deleteProduct(ProductId);
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
    const ProductId = req.params.ProductId;
    const productEx = await productService.getProductId(ProductId);
    if (!orderEx) {
      throw new Error("product does not exist");
    }
    await productService.updateProduct(ProductId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { orderEx },
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
