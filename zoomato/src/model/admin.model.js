const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["deliver", "cancel", "pending"],
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
    food: {
      type: mongoose.Types.ObjectId,
      ref: "Food",
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant",
    },
    country: {
      type: mongoose.Types.ObjectId,
      default: "India",
      ref: "country",
    },
    state: {
      type: mongoose.Types.ObjectId,
      default: "Gujarat",
      ref: "state",
    },
    city: {
      type: mongoose.Types.ObjectId,
      default: "Surat",
      ref: "city",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Declaring model for admin
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
