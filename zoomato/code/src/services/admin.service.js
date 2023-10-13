const { User } = require("../models");

const findAdmin=async(reqBody)=>{
  return User.findOne({$or:[{email:reqBody.email},{phone:reqBody.phone}]})
}
const createAdmin = async (reqBody) => {
  return User.create(reqBody);
};

const getAdminList = async (req, res) => {
  return User.find();
};

const getAdminId = async (adminId) => {
  return User.findById(adminId);
};

const deleteAdminId = async (adminId) => {
  return User.findByIdAndDelete(adminId);
};

const updateUser = async (adminId, updateBody) => {
  return await Admin.findByIdAndUpdate(
    adminId,
    { $set: updateBody },
    { new: true }
  );
};
module.exports = {
  findAdmin,
  deleteAdminId,
  getAdminId,
  getAdminList,
  createAdmin,findAdmin
};
