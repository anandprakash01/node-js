const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// const jwtSecretKey = "ThisIsSecretKey"; //always keep this on the server only // taken from users.login File
const jwtSecretKey = process.env.JWT_SECRET_KEY;
// console.log(jwtSecretKey);

const auth = async (req, res, next) => {
  /*    -->Security Check
    1. Extract JWT from header
    2. Validate the expiry of JWT
    3. Validate if the JWT is correct
   */

  // console.log(req.headers);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please pass the token in Authorization header",
    });
  }

  try {
    const isTokenValid = jwt.verify(token, jwtSecretKey);
    // console.log(isTokenValid);// if valid this will give payload obj of token
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err,
    });
  }

  const decodedToken = jwt.decode(token);
  // console.log(decodedToken);

  const now = Math.floor(Date.now()) / 1000;
  const tokenExp = decodedToken.exp;
  if (now > tokenExp) {
    // Token has expired
    return res.status(401).json({
      success: false,
      message: "Please login to access",
    });
  }

  const user = await User.findById(decodedToken._id);
  // console.log(user);
  if (!user.token || user.token != token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }
  req.user = user; //to access the current login user data

  console.log("inside Auth middleware");
  next();
};

module.exports = auth;
