const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified || !this.isNew) {
    next();
  } else this.isModified("password");
  if (this.password)
    this.password = await bcrypt.hash(String(this.password), 12);
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = User;
