const mongoose = require("mongoose");
const stateSchema = new mongoose.Schema(
  {
    // country name
    user_country: {
      type: String,
      trim: true,
      default: "india",
    },
    // state name
    state_name: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);
const State = mongoose.model("state", stateSchema);
module.exports = State;
