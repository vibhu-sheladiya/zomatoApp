const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    // user country name
    user_email: {
      type: String,
      trim: true,
    },
    // user name
    state_phone: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);
const Otp = mongoose.model("verify_otp", otpSchema);
module.exports = Otp;
