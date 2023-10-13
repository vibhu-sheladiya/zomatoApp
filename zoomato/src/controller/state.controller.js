const { stateService } = require("../service");

/**create State */
const createState = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const State = await stateService.createState (reqBody);

    if (!State) {
      throw new Error("State  not found !");
    }

    res.status(200).json({
      success: true,
      message: "State  created !",
      data: State,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      data:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

/**get State list */
const getStateList = async (req, res) => {
  try {
    const getList = await stateService.getStateList();
    if (!getList) {
      throw new Error("State not found !");
    }

    res.status(200).json({
      success: true,
      message: "Get State list !",
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

// /**get State details by id*/
const getStateDetails = async (req, res) => {
  try {
    const stateId = req.params.stateId;
    const getDetails = await stateService.getStateById(stateId);

    if (!getDetails) {
      throw new Error("State not found !");
    }
    res.status(200).json({
      success: true,
      message: "State details get successfully !",
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

// /**State details update by id */
const updateState = async (req, res) => {
  try {
    const stateId = req.params.stateId;
    const StateExist = await stateService.getStateById(stateId);

    if (!StateExist) {
      throw new Error("State not found !");
    }

    await stateService.updateState(stateId, req.body);

    res.status(200).json({
      success: true,
      message: "State details update successfully !",
      data: StateExist,
    });
  } catch (error) {
    res.status(error?.message || 400).json({
      success: false,
      message:
        error?.message || "Something wents wrong , please try again or later !",
    });
  }
};

// /**delete State */
const deleteState = async (req, res) => {
  try {
    const stateId = req.params.stateId;
    const State = await stateService.getStateById(stateId);
    console.log("State", stateId);
    if (!State) {
      throw new Error("State not found !");
    }

    await stateService.deleteState(stateId);

    res.status(200).json({
      success: true,
      message: "State deleted !",
      data: { State },
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
  createState,
  getStateList,
  getStateDetails,
  updateState,
  deleteState,
};
