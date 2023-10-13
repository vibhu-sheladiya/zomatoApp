const { Cart } = require("../models");
const createCart = async (reqBody) => {
  return Cart.create(reqBody);
};

const getCartList = async (req, res) => {
  return Cart.find().populate("user").populate("product");
};

const getCartListId = async (cartId) => {
  return Cart.findById(cartId);
};

const deleteCart = async (cartId) => {
  return Cart.findByIdAndDelete(cartId);
};

// update cart
const updateCart = async (cartId, updateBody) => {
  return await Cart.findByIdAndUpdate(
    cartId,
    { $set: updateBody },
    { new: true }
  );
};
module.exports = {
  createCart,
  getCartList,
  deleteCart,
  getCartListId,
  updateCart,
};
