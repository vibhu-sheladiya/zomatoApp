const { orderDetailService } = require("../service");

/**create Order */
const createOrder = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const order = await orderDetailService.createOrder(reqBody);

    if (!order) {
      throw new Error("Order  not found !");
    }

    res.status(200).json({
      success: true,
      message: "Order  created !",
      data: order,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get Order list */
const getOrderList = async (req, res) => {
  try {
    const getList = await orderDetailService.getOrderList();
    if (!getList) {
      throw new Error("Order not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get Order list !",
      data: { ...getList },
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**get Order details by id*/
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const getDetails = await orderDetailService.getOrderyById(orderId);

    if (!getDetails) {
      throw new Error("Order not found !");
    }
    res.status(200).json({
      success: true,
      message: "Order details get successfully !",
      data: getDetails,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**Order details update by id */
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const OrderExist = await orderDetailService.getOrderyById(orderId);

    if (!OrderExist) {
      throw new Error("Order not found !");
    }

    await orderDetailService.updateOrder(orderId, req.body);

    res.status(200).json({
      success: true,
      message: "Order details update successfully !",
      data: OrderExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete Order */
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const Order = await orderDetailService.getOrderyById(orderId);
    console.log("Order", orderId);
    if (!Order) {
      throw new Error("Order not found !");
    }

    await orderDetailService.deleteOrder(orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted !",
      data: { Order },
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

module.exports = {
  createOrder,
  getOrderList,
  getOrderDetails,
  updateOrder,
  deleteOrder,
};
