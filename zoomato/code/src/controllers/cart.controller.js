const { cartService } = require("../services");
// create cart
const createCart = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "+++++++++req.cart");
    const cart = await cartService.createCart(reqBody);
    if (!cart) {
      throw new Error("Error while creating the Cart");
    }
    res.status(200).json({
      message: "Successfully created a Cart",
      data: cart,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get cart list
const getCartList = async (req, res) => {
  try {
    const cartList = await cartService.getCartList(req, res);
    res.status(200).json({
      success: true,
      data: { ...cartList },
      message: "success",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get cart details by id
const getCartDetailsById = async (req, res) => {
  try {
    const cartDetails = await cartService.getCartListId(req.params.cartId);
    if (!cartDetails) {
      throw new Error("No such product exists");
    }
    res.status(200).json({
      data: { ...cartDetails },
      success: "cart detils get successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// delete cart by id
const deleteCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExists = await cartService.getCartListId(cartId);
    if (!cartExists) {
      throw new Error("No Such cart Found");
    }
    res.status(200).json({
      message: "deleted",
      success: true,
    });
    await cartService.deleteCart(cartId);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartEx = await cartService.getCartListId(cartId);
    if (!cartEx) {
      throw new Error("cart does not exist");
    }
    await cartService.updateCart(cartId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { cartEx },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  deleteCartById,
  getCartList,
  getCartDetailsById,
  createCart,
  updateCart,
};
