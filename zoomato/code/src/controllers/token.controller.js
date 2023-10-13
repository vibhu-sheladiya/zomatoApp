const { tokenService } = require("../services");
// const moment = require("moment");

const generateToken = async (req, res) => {
  try {
    const reqBody = req.body;

    const token = await tokenService.createToken(reqBody);
    reqBody.token = token;
    // console.log(token)

    const saveToken = await tokenService.saveToken(reqBody);
    console.log(saveToken);
    res
      .status(200)
      .json({ success: true, message: "token created", data: saveToken });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "failed to create a new user",
    });
  }
};

const verifyToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "verified successfully ",
    data: req.user,
  });
};
module.exports = {
  generateToken,
  verifyToken,
};
