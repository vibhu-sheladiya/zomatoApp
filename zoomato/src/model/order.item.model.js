const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    // order quantity
    quantity: {
      type: Number,
      trim: true,
    },
    // order all price
    subtotal_price: {
      type: Number,
      trim: true,
    },
    // reference from order
    order: {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("item", itemSchema);
module.exports = Item;
 