const { Itemorder } = require("../model");

/**create Itemorder */
const createItemorder = async (reqBody) => {
  return Itemorder.create(reqBody);
};

/**get Itemorder list */
const getItemorderList = async (req, res) => {
  return Itemorder.find().populate("order");
};

/**get Itemorder details by id */
const getItemorderById = async (itemId) => {
  return Itemorder.findById(itemId);
};

/**update Itemorder */
const updateItemorder = async (itemId, updateBody) => {
  return Itemorder.findByIdAndUpdate(itemId, { $set: updateBody });
};

/**delete Itemorder */
const deleteItemorder = async (itemId) => {
  return Itemorder.findByIdAndDelete(itemId);
};

module.exports = {
  createItemorder,
  getItemorderList,
  getItemorderById,
  updateItemorder,
  deleteItemorder,
};
