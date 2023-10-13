const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema(
  {
    // food name
    fname: { type: String, trim: true },
    // food gallery image
    fimg: {
      type: String,
      trim: true,
    },
    // food description
    fdesc: {
      type: String,
      trim: true,
    },
    //  reference from restaurant type
    res_type: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant_type",
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, data) {
        if (data?.fimg) {
          data.fimg = `${config.base_url}gallery_images/${data.fimg}`;
        }
      },
    },
  }
);
const Gallery = mongoose.model("gallery", gallerySchema);
module.exports = Gallery;
