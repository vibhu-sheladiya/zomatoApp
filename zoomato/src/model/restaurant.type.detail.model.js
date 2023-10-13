const mongoose = require("mongoose");
const restaurant_typeSchema = new mongoose.Schema(
  {
    // restaurant type name
    type_name: {
      type: String,
      trim: true,
    },
    // restaurant type start date
    start_date: {
      type: Date,
      // default: "2019-07-31",
      trim: true,
    },
    // restaurant end date
    end_date: { type: Date, trim: true },
    // restaurant type from restaurant name
    rest_name: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);
const Restaurant_type = mongoose.model(
  "restaurant_type",
  restaurant_typeSchema
);
module.exports = Restaurant_type;
