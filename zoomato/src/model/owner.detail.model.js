const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema(
  {
    // owner name
    oname: {
      type: String,
      required: true,
      trim: true,
    },
    // owner phone number
    ophone: {
      type: Number,
      minlength: [10],
      maxlength: [10],
    },
    // owner email
    oemail: {
      type: String,
      trim: true,
    },
    // reference from restaurant detail
    restaurant_name: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant",
    },
  },
  { timestamps: true }
);
const Owner = mongoose.model("owner", ownerSchema);
module.exports = Owner;
 