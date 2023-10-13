const { Rtype } = require("../model");

/**create Restaurant */
const createRestaurantType = async (reqBody) => {
  return Rtype.create(reqBody);
};

/**get Restaurant list */
const getRestaurantTypeList = async (req, res) => {
  return Rtype.find();
};

/**get Restaurant details by id */
const getRestaurantTypeById = async (restauranttypeId) => {
  return Rtype.findById(restauranttypeId);
};

/**update Restaurant */
const updateRestaurantType = async (restauranttypeId, updateBody) => {
  return Rtype.findByIdAndUpdate(restauranttypeId, { $set: updateBody });
};

/**delete Restaurant */
const deleteRestaurantType = async (restauranttypeId) => {
  return Rtype.findByIdAndDelete(restauranttypeId);
};

module.exports = {
  createRestaurantType,
  getRestaurantTypeList,
  getRestaurantTypeById,
  updateRestaurantType,
  deleteRestaurantType,
};
