const { userService, emailService, verifyOtpService } = require("../service");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const {auth} = require("../middleware/auth2");
// const config = "../config/config.js";

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const existingUser = await userService.findUserByEmail({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists.",
    });
  }

  const hashPassword = await bcrypt.hash(password, 8);

  let option = {
    email,
    role,
    exp: moment().add(1, "days").unix(),
  };

  const token = await jwt.sign(option, jwtSecrectKey);

  const filter = {
    email,
    role,
    password: hashPassword,
    token,
  };

  const data = await userService.createUser(filter);

  res.status(200).json({ success: true, data: data });
};
/**login */
const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findUser = await userService.findUserByEmail({ email });

    if (!findUser) throw Error("User not found");

    const successPassword = await bcrypt.compare(password, findUser.password);

    console.log("Input Password:", password);
    console.log("Hashed Password in Database:", findUser.password);

    if (!successPassword) {
      console.log("Password Comparison Failed");
      throw Error("Incorrect password");
    }

    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      role: findUser.role,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findUser && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await userService.findUserAndUpdate(findUser._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**verify otp */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await verifyOtpService.findOtpByOtp({ otp });
    console.log("user", user);
    if (!user) {
      throw new Error("Invalid OTP entered!");
    }
    const findEmail = await verifyOtpService.findOtpByEmail({ email });
    console.log("findEmail", findEmail);

    if (!findEmail) {
      throw new Error("User not found");
    }
    findEmail.otp = otp;
    await findEmail.save();
    if (findEmail.otp === otp) {
      return res.status(200).json({
        success: true,
        message: "your otp is right thank you",
        data: user,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
      if (!checkToken) {
          throw new Error("Please login again to update your password");
        }
      if (newPassword !== confirmPassword) {
        throw new Error("New Password and Confirm Password are different");
        }
        let hashedPassword=await bcrypt.hashSync(newPassword, 8);
        const updatedData={password:hashedPassword}
        const result=await userService.updateOne({_id:decodedToken._id},updatedData);
        if(!result){
          throw new Error('Failed to Update Password');
          }else{
            return res.status(200).send({success:true,data:'Successfully Updated Password'});
            }
            } catch (error) {
              res.status(500).json({ error: error.message });
              }
              };
//     if (!token) {
//       return res.status(400).json({ error: 'JWT token must be provided' });
//     }
    
//     try {
//       const decodedToken = jwt.verify(token, process.env.JWTSECRETKEY);

//       if (newPassword !== confirmPassword) {
//         return res.status(400).json({ error: 'Passwords do not match' });
//       }
//       const user = await userService.findUserById(decodedToken.userId);

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       const hashedPassword = await hashPassword(newPassword);
//       await userService.updatePassword(user._id, hashedPassword);
//       res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid JWT token' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
//    const decodedToken= await auth(req.headers.token);

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }
//     const user = await userService.getUserById(decodedToken.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const hashedPassword = await hashPassword(newPassword);
//     await userService.updatePassword(user._id, hashedPassword);
//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


/**forgot password */
const forgetPassword = async (req, res) => {
  try {
    const { email, user_name } = req.body;
    const findUser = await userService.findUserByEmail({ email });
    console.log(findUser);
    if (!findUser) throw Error("User not found");
    const otp = ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4);
    findUser.otp = otp;
    await findUser.save();
    ejs.renderFile(
      path.join(__dirname, "../views/otp-template.ejs"),
      {
        email: email,
        otp: otp,
        user_name: user_name,
      },
      async (err, data) => {
        if (err) {
          let userCreated = await userService.findUserByEmail(email);
          if (userCreated) {
            await userService.deleteUserByEmail(email);
          }
          throw new Error("Something went wrong, please try again.");
        } else {
          emailService.sendMail(email, data, "Verify Email");
        }
      }
    );
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      // data: { data },
      data: `user otp is stored ${otp}`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**reset password */
// const resetPassword = async (req, res) => {
//   try {
//     const { email, password } = req.query;
//     const user=await userService.findByEmail(email);
//     if(!user){
//       return res.status(400).json({success:false,message:"Invalid credentials"})
//     }
//     const hashedPassword = bcrypt.hashSync(password, 8);
//     user.password = hashedPassword;
//     await user.save();
//     res.status(200).json({
//       success:true,
//       message:'Password updated successfully',
//       })
//     const decodedToken = jwt.verify(token, process.env.JWTSECRETKEY);
//     const updatePassword = await userService.updatePassword(
//       decodedToken._id,
//       password
//     );
//     res.status(200).json({
//       success: true,
//       message: "password updated successfully!",
//       data: updatePassword,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }
    const user = await userService.findUserByEmail({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 8);
    await userService.updatePassword(user._id, hashPassword);
    // Optionally, you can add more password validation logic here.
    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get user list */
const getUserList = async (req, res) => {
  try {
    const getList = await userService.getUserList(req, res);

    res.status(200).json({
      success: true,
      message: "Get user list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get user details by id */
const getUserDetails = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }

    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** user details update by id */
const updateDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }

    await userService.updateDetails(userId, req.body);

    res
      .status(200)
      .json({ success: true, message: "User details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**change password */
// const changePassword = async (req, res) => {
//   try {
//     const { token, newPassword, confirmPassword } = req.body;

//     const decodedToken = verifyToken(token,jwtSecrectKey);

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }
//     const user = await userService.getUserById(decodedToken.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const hashedPassword = await hashPassword(newPassword);
//     await userService.updatePassword(user._id, hashedPassword);
//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
//     const resetToken = await userService.findUserAndUpdate({
//       userId: id,
//       token,
//     });
//     if (!resetToken) {
//       return res.status(404).send({ message: "INVALID LINK!!!" });
//     }
//     const userExists = await userService.getUserById(userId);
//     if (!userExists) {
//       throw new Error("User not found!");
//     }
//     await userService.changePassword(userId, req.body);
//     res
//       .status(200)
//       .json({ success: true, message: "password changed successfully" });
//   } catch (error) {
//     console.log("err", error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
/** Delete user */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }

    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    const sendEmail = await emailService.sendMail(
      reqBody.email,
      reqBody.subject,
      reqBody.text
    );
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
const getAllUser = async (req, res) => {
  try {
    console.log(req.headers.token, "");
    await auth(req.headers.token, ["admin"]);

    const data = await userService.getAllUser({ role: "admin" });
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: { data },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  register,
  login,
  getAllUser,
  verifyOtp,
  getUserList,
  getUserDetails,
  updateDetails,
  deleteUser,
  sendMail,
  forgetPassword,
  resetPassword,
  changePassword,
};
