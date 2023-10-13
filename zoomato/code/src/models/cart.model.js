const mongoose = require("mongoose");
const cartScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    qty: {
      type: Number,
      default: 1,
    },
    totalqty: {
      type: String,
    },
    totalprice: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Cart = mongoose.model("cart", cartScheme);
module.exports = Cart;
