const mongoose = require("mongoose");
const orderScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "cart",
    },
    desc: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("order", orderScheme);
module.exports = Order;
