const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";

const auth = (token, userId) => {
  jwt.verify(token, jwtSecrectKey, (err, decoded) => {
    console.log(userId,'userId');
    if (err || !userId.find((ele) => ele === decoded.userId)) {
      console.log(decoded.userId,'decoded.userId');
      console.log("=====err=====", err);
      throw Error("You dont have permission");
    }
  });
};

module.exports = {
  auth,
};
