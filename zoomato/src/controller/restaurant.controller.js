const {restaurantDetailService  } = require("../service");

/**create Restaurant */
const createRestaurant = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const Restaurant = await restaurantDetailService.createRestaurant(reqBody);

    if (!Restaurant) {
      throw new Error("Restaurant  not found !");
    }

    res.status(200).json({
      success: true,
      message: "Restaurant  created !",
      data: Restaurant,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get Restaurant list */
const getRestaurantList = async (req, res) => {
  try {
    const getList = await restaurantDetailService.getRestaurantList();
    if (!getList) {
      throw new Error("Restaurant not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get Restaurant list !",
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

// /**get Restaurant details by id*/
const getRestaurantDetails = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const getDetails = await restaurantDetailService.getRestaurantById(restaurantId);

    if (!getDetails) {
      throw new Error("Restaurant not found !");
    }
    res.status(200).json({
      success: true,
      message: "Restaurant details get successfully !",
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

// /**Restaurant details update by id */
const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const RestaurantExist = await restaurantDetailService.getRestaurantById(restaurantId);

    if (!RestaurantExist) {
      throw new Error("Restaurant not found !");
    }

    await restaurantDetailService.updateRestaurant(restaurantId, req.body);

    res.status(200).json({
      success: true,
      message: "Restaurant details update successfully !",
      data: RestaurantExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete Restaurant */
const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const Restaurant = await restaurantDetailService.getRestaurantById(restaurantId);
    console.log("Restaurant", restaurantId);
    if (!Restaurant) {
      throw new Error("Restaurant not found !");
    }

    await restaurantDetailService.deleteRestaurant(restaurantId);

    res.status(200).json({
      success: true,
      message: "Restaurant deleted !",
      data: { Restaurant },
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
  createRestaurant,
  getRestaurantList,
  getRestaurantDetails,
  updateRestaurant,
  deleteRestaurant,
};
