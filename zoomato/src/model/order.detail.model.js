const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // order date
    o_date: {
      type: Date,
      default: Date.now(),
      trim: true,
    },
    // order status
    o_status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
      trim: true,
    },
    // total price
    total_price: {
      type: Number,
      trim: true,
    },
    // reference from user
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      trim: true,
    },
    // reference from restaurant type
    res_type: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant_type",
      trim: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
