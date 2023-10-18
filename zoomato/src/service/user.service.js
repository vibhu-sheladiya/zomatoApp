const { User } = require("../model");

/**create user */
const createUser = async (reqBody) => {
  return User.create(reqBody);
};
/**get user list */
const getUserList = async (req, res) => {
  return User.find();
};
/**get user details by id */
const getUserById = async (userId) => {
  return User.findById(userId);
};

/**update user */
const updateUser = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody });
};
const findUserAndUpdate = async (_id, token) => {
  return await User.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};
/**delete user */
const deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};
const findUserByEmail = async (email) => {
  return await User.findOne(email);
};
const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findUserByOtp = async (otp) => {
  return await User.findOne(otp);
};
const deleteUserByEmail = async (email) => {
  return User.findOneAndDelete({ email: email });
};

const updatePassword = async (userId, newPassword) => {
  return User.findByIdAndUpdate(userId, { password: newPassword });
};
module.exports = {
  createUser,
  getUserList,
  getUserById,
  updateUser,
  deleteUser,
  findUserByOtp,
  findUserByEmail,
  deleteUserByEmail,
  findUserAndUpdate,
  findByEmail,
  updatePassword,

};
