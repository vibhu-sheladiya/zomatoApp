const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    // restaurant name
    name: {
      type: String,
      trim: true,
    },
    // restaurant start date
    start_date: {
      type: Date,
      default: "2019-07-31",
      trim: true,
    },
    // restaurant end date
    opening_hour: {
      type: Date,
      default: new Date().setHours(8, 0, 0),
      trim: true,
    },
    closing_hour: {
      type: Date,
      default: new Date().setHours(8, 0, 0),
      trim: true,
    },
  },
  { timestamps: true }
);
const Restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports = Restaurant;
