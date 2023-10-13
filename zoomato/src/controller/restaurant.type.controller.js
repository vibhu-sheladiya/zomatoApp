const { restaurantTypeService } = require("../service");

/**create restaurant */
const createRestaurantTypec = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const type = await restaurantTypeService.createRestaurantType(reqBody);

    if (!type) {
      throw new Error("Restaurant type not found !");
    }

    res.status(200).json({
      success: true,
      message: "Restaurant type created !",
      data: type,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get restaurant list */
const getRestaurantTypeList = async (req, res) => {
  try {
    const getList = await restaurantTypeService.getRestaurantTypeList();
    if (!getList) {
      throw new Error("Restaurant not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get restaurant list !",
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

// /**get restaurant details by id*/
const getRestaurantTypeDetails = async (req, res) => {
  try {
    const restauranttypeId = req.params.restauranttypeId;
    const getDetails = await restaurantTypeService.getRestaurantTypeById(
      restauranttypeId
    );

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

// /**restaurant details update by id */
const updateRestaurantType = async (req, res) => {
  try {
    const restauranttypeId = req.params.restauranttypeId;
    const restaurantExist = await restaurantTypeService.getRestaurantTypeById(
      restauranttypeId
    );

    if (!restaurantExist) {
      throw new Error("Restaurant not found !");
    }

    await restaurantTypeService.updateRestaurantType(
      restauranttypeId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Restaurant details update successfully !",
      data: restaurantExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete restaurant */
const deleteRestaurantType = async (req, res) => {
  try {
    restauranttypeId = req.params.restauranttypeId;
    const restaurant = await restaurantTypeService.getRestaurantTypeById(
      restauranttypeId
    );
    console.log("restaurant", restauranttypeId);
    if (!restaurant) {
      throw new Error("Restaurant not found !");
    }

    await restaurantTypeService.deleteRestaurantType(restauranttypeId);

    res.status(200).json({
      success: true,
      message: "Restaurant deleted !",
      data: { restaurant },
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
  createRestaurantTypec,
  getRestaurantTypeList,
  getRestaurantTypeDetails,
  updateRestaurantType,
  deleteRestaurantType,
};
