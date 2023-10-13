const { Product } = require("../models");
const createProduct = async (reqBody) => {
  return Product.create(reqBody);
};

const productList = async (req, res) => {
  return Product.find();
};

const getProductId = async (ProductId) => {
  return Product.findById(ProductId);
};

const deleteProduct = async (productId) => {
  return Product.findByIdAndDelete(productId);
};

const updateProduct = async (productId, updateBody) => {
  return await Product.findByIdAndUpdate(
    productId,
    { $set: updateBody },
    { new: true }
  );
};
module.exports = {
  productList,
  getProductId,
  deleteProduct,
  createProduct,
  updateProduct,
};
