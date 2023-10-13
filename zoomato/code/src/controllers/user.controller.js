
const { userService, emailService, adminService } = require("../services");

const createUser = async (req, res) => {
  try {
    // If request is from user end
    const reqBody = req.body;
    if (reqBody.role == "user") {

      if (!!(await userService.findUser(reqBody))) {
        
        return res.status(208).json({
          message: "Email or Phone Number already registered",
        });
      }
      console.log(reqBody, "++++++user");
      const user = await userService.createUser(reqBody);
      if (!user) {
        throw new Error("no such user");
      }
      res.status(200).json({
        message: "Successfully created a new employee",
        success: true,
        data: { user },
      });
    }
    // If request is from admin end
    else if (reqBody.role == "admin") {
      if (!!(await adminService.findAdmin(req, res))) {
        return res.status(400).json({
          message: "Email or Phone Number already registered for admin ",
        });
      }
      console.log(reqBody, "++++++admin");
      const admin = await adminService.createAdmin(reqBody);
      if (!admin) {
        throw new Error("no such admin");
      }
      return res.status(201).json({
        message: "Successfully created a new employee",
        success: true,
        data: { admin },
      });
    }
    // Invalid User type
    else {
      return res.status(400).json({
        message: "Invalid User Type",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const getUserList = async (req, res) => {
  try {
    let user = await userService.getUserList(req, res);
    res.status(200).json({
      message: "successfully fetched all users",
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await userService.getUserId(req.params.userId);
    if (!user) {
      throw new Error("No Such User Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${user._id}`,
      data: { user },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userService.deleteUserId(userId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: { user },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userEx = await userService.getUserId(userId);
    if (!userEx) {
      throw new Error("userId does not exist");
    }
    await userService.updateUser(userId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { userEx },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("get req body");
    const sendEmail = await emailService.sendMail(
      reqBody.email,
      reqBody.subject,
      reqBody.text
    );
    console.log("Send Done..");
    if (!sendEmail) {
      throw new Error("Something went wrong, please try again or later.");
    }

    res
      .status(200)
      .json({ success: true, message: "Email send successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  createUser,
  getUserList,
  getUserId,
  deleteUser,
  updateUser,
  sendMail,
};
