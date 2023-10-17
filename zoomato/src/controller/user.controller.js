const { userService, emailService, verifyOtpService } = require("../service");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
// const config = "../config/config.js";

const register = async (req, res) => {
  const { email, password, role } = req.body;

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

const login = async (req, res) => {
  try {
    const { email, password, user_name } = req.body;

    const findUser = await userService.findUserByEmail({ email });
    console.log(findUser);
    if (!findUser) throw Error("User not found");

    const successPassword = await bcrypt.compare(password, findUser.password);
    console.log(successPassword);
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
      data: { data },
      data: `user otp is stored ${otp}`,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
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

/** create user */
// const createUser = async (req, res) => {
//   try {
//     const reqBody = req.body;

//     const userExists = await userService.getUserByEmail(reqBody.email);
//     if (userExists) {
//       throw new Error("User already created by this email!");
//     }

//     const user = await userService.createUser(reqBody);

//     if (!user) {
//       throw new Error("Something went wrong, please try again or later!");
//     }

//     ejs.renderFile(
//       path.join(__dirname, "../views/otp-template.ejs"),
//       {
//         email: reqBody.email,
//         otp: ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4),
//         first_name: reqBody.first_name,
//         last_name: reqBody.last_name,
//       },
//       async (err, data) => {
//         if (err) {
//           let userCreated = await userService.getUserByEmail(reqBody.email);
//           if (userCreated) {
//             await userService.deleteUserByEmail(reqBody.email);
//           }
//           throw new Error("Something went wrong, please try again.");
//         } else {
//           emailService.sendMail(reqBody.email, data, "Verify Email");
//         }
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "User create successfully!",
//       data: { user },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
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

/**forgot password */

async function resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    verify(token, process.env.EMAIL_SECRET, async function (err, decoded) {
      //Check if token is valid
      if (err) {
        res.status(400).json({
          message: "Invalid token!",
        });

        //Request body validation result. Throw error for invalid values.
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });

        //For get request send a password changing form
        if (req.method === "GET") {
          res.status(200).send(passwordResetInput(token));
        }
        //For post request reset given password
      } else if (req.method === "POST") {
        const payload = decoded;
        const { password } = req.body;
        const hashPassword = await hash(password, 10);

        if (payload && payload._id) {
          await User.findByIdAndUpdate(payload._id, {
            password: hashPassword,
          });
          res.status(201).json({ message: "Password changed successfully." });
        }
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

// const forgotPassword = async (req,res)=>{
//   try{
//     console.log('inside forgetpassword');
//     console.log(req.params,'this is the params')
//     console.log(req.query,"this is query")
//     let token=await jwt.sign({_id:req.params._id},process.env.SECRETKEY,{expiresIn:
//       '3h'})
//       console.log(token,'this is tokeennnn')
//       var transporter = nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//           user:`${process.env.EMAIL}`,
//           pass:`${process.env.PASSWORD}`
//           }
//           })
//           var mailOptions={
//             from:`${process.env.EMAIL}`,
//             to:`${req.query.email}`,
//             subject :'reset your password ',
//             text:`http://localhost:8000/api/auth/change-password?token=${token} `
//             }
//             transporter.sendMail(mailOptions,(err,info)=>{
//               if(!err){
//                 console.log(`Message sent ${info.response}`);

// const forgetPassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const userdata = await userService.findUserByEmail({ email });
//     if (!userdata) {
//       // const randomString = randomString.generate();
//       const data = await userService.findUserAndUpdate(userdata.email, token);
//       sendResetPasswordMail(userdata.first_name, userdata.email, randomString);
//       res
//         .status(200)
//         .json({
//           success: true,
//           message: "please check your inbox",
//           data: userdata,
//         });
//     } else {
//       res
//         .status(404)
//         .json({ success: true, message: "this eamial does not exists" });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

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
  resetPassword,
};
