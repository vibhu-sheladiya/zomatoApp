const { User } = require("../model");

const findOtpByEmail = async (email) => {
  return await User.findOne(email);
};
const findOtpByOtp = async (otp) => {
    return await User.findOne(otp);
  };

module.exports = {  
    findOtpByEmail,
    findOtpByOtp,
};
