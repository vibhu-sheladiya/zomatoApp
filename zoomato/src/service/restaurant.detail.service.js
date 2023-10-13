const { Restaurant } = require("../model");

/**create Restaurant */
const createRestaurant = async (reqBody) => {
  return Restaurant.create(reqBody);
};

/**get Restaurant list */
const getRestaurantList = async (req, res) => {
  return Restaurant.find();
};

/**get Restaurant details by id */
const getRestaurantById = async (restaurantId) => {
  return Restaurant.findById(restaurantId);
};

/**update Restaurant */
const updateRestaurant = async (restaurantId, updateBody) => {
  return Restaurant.findByIdAndUpdate(restaurantId, { $set: updateBody });
};

/**delete Restaurant */
const deleteRestaurant = async (restaurantId) => {
  return Restaurant.findByIdAndDelete(restaurantId);
};

module.exports = {
  createRestaurant,
  getRestaurantList,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
