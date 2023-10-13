const { cityService } = require("../service");

/**create City */
const createCity = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const city = await cityService.createCity(reqBody);

    if (!city) {
      throw new Error("City  not found !");
    }

    res.status(200).json({
      success: true,
      message: "City  created !",
      data: city,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get City list */
const getCityList = async (req, res) => {
  try {
    const getList = await cityService.getCityList();
    if (!getList) {
      throw new Error("City not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get City list !",
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

// /**get City details by id*/
const getCityDetails = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const getDetails = await cityService.getCityById(cityId);

    if (!getDetails) {
      throw new Error("City not found !");
    }
    res.status(200).json({
      success: true,
      message: "City details get successfully !",
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

// /**City details update by id */
const updateCity = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const CityExist = await cityService.getCityById(cityId);

    if (!CityExist) {
      throw new Error("City not found !");
    }

    await cityService.updateCity(cityId, req.body);

    res.status(200).json({
      success: true,
      message: "City details update successfully !",
      data: CityExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete City */
const deleteCity = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    console.log("City", cityId);
    const City = await cityService.getCityById(cityId);
    console.log(City);
    if (!City) {
      throw new Error("City not found !");
    }

    await cityService.deleteCity(cityId);

    res.status(200).json({
      success: true,
      data: { City },
      message: "City deleted !",
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
  createCity,
  getCityList,
  getCityDetails,
  updateCity,
  deleteCity,
};
