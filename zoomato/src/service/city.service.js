const { City } = require("../model");

/**create City */
const createCity = async (reqBody) => {
  return City.create(reqBody);
};

/**get City list */
const getCityList = async (req, res) => {
  return City.find().populate("state");
};

/**get City details by id */
const getCityById = async (cityId) => {
  return City.findById(cityId);
};

/**update City */
const updateCity = async (cityId, updateBody) => {
  return City.findByIdAndUpdate(cityId, { $set: updateBody });
};

/**delete City */
const deleteCity = async (cityId) => {
  return User.findByIdAndDelete(cityId);
};

module.exports = {
  createCity,
  getCityList,
  getCityById,
  updateCity,
  deleteCity,
};
