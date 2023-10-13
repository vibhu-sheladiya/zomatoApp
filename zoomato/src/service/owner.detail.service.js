const { Owner } = require("../model");

/**create Owner */
const createOwner = async (reqBody) => {
  return Owner.create(reqBody);
};

/**get Owner list */
const getOwnerList = async (req, res) => {
  return Owner.find().populate("restaurant_name");
};

/**get Owner details by id */
const getOwnerById = async (ownerId) => {
  return Owner.findById(ownerId);
};

/**update Owner */
const updateOwner = async (ownerId, updateBody) => {
  return Owner.findByIdAndUpdate(ownerId, { $set: updateBody });
};

/**delete Owner */
const deleteOwner = async (ownerId) => {
  return Owner.findByIdAndDelete(ownerId);
};

module.exports = {
  createOwner,
  getOwnerList,
  getOwnerById,
  updateOwner,
  deleteOwner,
};
