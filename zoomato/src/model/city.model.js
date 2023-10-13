const mongoose = require("mongoose");
const citySchema = new mongoose.Schema(
  {
    // city name
    cname: {
      type: String,
      trim: true,
    },
    // reference from state
    state: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: "state",
    },
    // status manage
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  // created and updated date
  { timestamps: true }
);
// creating model
const City = mongoose.model("city", citySchema);
module.exports = City;
