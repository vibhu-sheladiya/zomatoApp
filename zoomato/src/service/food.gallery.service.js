const { Gallery } = require("../model");

/**
 * Get Gallery details
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const getGalleryById = async (galleryId) => {
  return Gallery.findOne({ _id: galleryId });
};

/**
 * Get Gallery list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Product>}
 */
const getList = async () => {
  return Gallery.find().populate("res_type");
};

/**
 * Create product
 * @param {object} reqBody
 * @returns {Promise<Product>}
 */
const createGallery = async (reqBody) => {
  return Gallery.create(reqBody);
};

/**
 * Update Gallery details
 * @param {ObjectId} galleryId
 * @param {object} reqBody
 * @returns {Promise<Product>}
 */
const updateGallery = async (galleryId, reqBody) => {
  return Gallery.findOneAndUpdate(
    { _id: galleryId },
    { $set: reqBody },
    { new: true }
  );
};

/**
 * Manage product status
 * @param {ObjectId} galleryId
 * @returns {Promise<Product>}
 */
const manageGalleryStatus = async (galleryId) => {
  const productExists = await getProductById(galleryId);
  if (!productExists) {
    throw new Error("Gallery not found!");
  }
  return Gallery.findOneAndUpdate(
    { _id: galleryId },
    {
      $set: {
        is_active: !productExists.is_active,
      },
    },
    { new: true }
  );
};
/**
 * Delete product
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteGallery = async (galleryId) => {
  return Gallery.findOneAndDelete({ _id: galleryId });
};

module.exports = {
  getGalleryById,
  getList,
  createGallery,
  updateGallery,
  manageGalleryStatus,
  deleteGallery,
};
