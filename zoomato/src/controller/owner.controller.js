const {ownerDetailService  } = require("../service");

/**create Owner */
const createOwner = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const Owner = await ownerDetailService.createOwner(reqBody);

    if (!Owner) {
      throw new Error("Owner  not found !");
    }

    res.status(200).json({
      success: true,
      message: "Owner  created !",
      data: Owner,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get Owner list */
const getOwnerList = async (req, res) => {
  try {
    const getList = await ownerDetailService.getOwnerList();
    if (!getList) {
      throw new Error("Owner not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get Owner list !",
      data: { ...getList },
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**get Owner details by id*/
const getOwnerDetails = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const getDetails = await ownerDetailService.getOwnerById(ownerId);

    if (!getDetails) {
      throw new Error("Owner not found !");
    }
    res.status(200).json({
      success: true,
      message: "Owner details get successfully !",
      data: getDetails,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**Owner details update by id */
const updateOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const OwnerExist = await ownerDetailService.getOwnerById(ownerId);

    if (!OwnerExist) {
      throw new Error("Owner not found !");
    }

    await ownerDetailService.updateOwner(ownerId, req.body);

    res.status(200).json({
      success: true,
      message: "Owner details update successfully !",
      data: OwnerExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete Owner */
const deleteOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const Owner = await ownerDetailService.getOwnerById(ownerId);
    console.log("Owner", ownerId);
    if (!Owner) {
      throw new Error("Owner not found !");
    }

    await ownerDetailService.deleteOwner(ownerId);

    res.status(200).json({
      success: true,
      message: "Owner deleted !",
      data: { Owner },
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

module.exports = {
  createOwner,
  getOwnerList,
  getOwnerDetails,
  updateOwner,
  deleteOwner,
};
