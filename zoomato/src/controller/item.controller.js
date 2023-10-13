const { orderItemService } = require("../service");

/**create Item */
const createItem = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const item = await orderItemService.createItemorder(reqBody);

    if (!item) {
      throw new Error("Item  not found !");
    }

    res.status(200).json({
      success: true,
      message: "Item  created !",
      data: item,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get Item list */
const getItemList = async (req, res) => {
  try {
    const getList = await orderItemService.getItemorderList();
    if (!getList) {
      throw new Error("Item not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get Item list !",
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

// /**get Item details by id*/
const getItemDetails = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const getDetails = await orderItemService.getItemorderById(itemId);

    if (!getDetails) {
      throw new Error("Item not found !");
    }
    res.status(200).json({
      success: true,
      message: "Item details get successfully !",
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

// /**Item details update by id */
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const ItemExist = await orderItemService.getItemorderById(itemId);

    if (!ItemExist) {
      throw new Error("Item not found !");
    }

    await orderItemService.updateItemorder(itemId, req.body);

    res.status(200).json({
      success: true,
      message: "Item details update successfully !",
      data: ItemExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete Item */
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const Item = await orderItemService.getItemorderById(itemId);
    console.log("Item", itemId);
    if (!Item) {
      throw new Error("Item not found !");
    }

    await orderItemService.deleteItemorder(itemId);

    res.status(200).json({
      success: true,
      message: "Item deleted !",
      data: { Item },
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
  createItem,
  getItemList,
  getItemDetails,
  updateItem,
  deleteItem,
};
