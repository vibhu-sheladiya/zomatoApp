const { Order } = require("../model");

/**create Order */
const createOrder = async (reqBody) => {
  return Order.create(reqBody);
};

/**get Order list */
const getOrderList = async (req, res) => {
  return Order.find().populate("res_type");
};

/**get Order details by id */
const getOrderyById = async (orderId) => {
  return Order.findById(orderId);
};

/**update Order */
const updateOrder = async (orderId, updateBody) => {
  return Order.findByIdAndUpdate(orderId, { $set: updateBody });
};

/**delete Order */
const deleteOrder = async (orderId) => {
  return Order.findByIdAndDelete(orderId);
};

module.exports = {
  createOrder,
  getOrderList,
  getOrderyById,
  updateOrder,
  deleteOrder,
};
