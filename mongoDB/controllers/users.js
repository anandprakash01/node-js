const bcrypt = require("bcrypt"); // uses blowfish algo
const jwt = require("jsonwebtoken");

const Users = require("../models/user.js");

const {asyncFunction} = require("../utils/helper.js");

const logger = require("../utils/logger.js");

// const jwtSecretKey = "ThisIsSecretKey"; //always keep this on the server only//environment Variable
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const registerUser = asyncFunction(async (req, res) => {
  // throw new Error("Error in resister API"); //for checking error handling

  //if dont write try/catch here error will handled by helper fun in utils

  // try {
  // const userDetails = req.body;
  const userDetails = {
    email: req.body.email,
    // password: "00000",
    name: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
    role: req.body.role,
  };
  const plainTextPassword = req.body.password;

  /*  1.Import bcrypt library
        2.Generate salt
        3.Hash the Password    */

  const salt = await bcrypt.genSalt(10); //generates salt(randomString) and mix the password 10 times (randamised X times)
  // console.log("salt:", salt);

  const cipherTextPassword = await bcrypt.hash(plainTextPassword, salt);
  // console.log("passwordHash:", cipherTextPassword);

  userDetails.password = cipherTextPassword;

  const newUser = new Users(userDetails);
  // console.log(userDetails);

  const result = await newUser.save();
  // console.log(result);//return a created user

  return res.json({
    success: true,
    message: `user, ${result.name} added successfully`,
  });
  // } catch (err) {
  //   res.status(400).json({
  //     success: false,
  //     message: `Something went wrong, ${err}`,
  //   });
  // }
});

const loginUser = asyncFunction(async (req, res) => {
  const body = req.body;

  // throw new Error("Error in login");

  const email = body.email;
  const user = await Users.findOne({email: email});

  console.log("User:", user);
  // logger.info("User Logged in: ", user); // consoles in json

  if (!user) {
    return res.json({
      success: false,
      message: "User is not registered, Please create account",
    });
  }

  const passwordHash = user.password;
  const loginPassword = body.password;

  const isPasswordCorrect = await bcrypt.compare(loginPassword, passwordHash);

  // console.log(isPasswordCorrect);//true/false

  if (!isPasswordCorrect) {
    return res.json({
      success: false,
      message: "Incorrect username or password",
    });
  }

  const currTimeInSeconds = Math.floor(new Date() / 1000);
  const expiryTime = currTimeInSeconds + 3600; // adding 1 hr to current time

  const tokenPayload = {
    email: user.email,
    _id: user._id,
    exp: expiryTime,
    role: user.role,
  };

  // Generate JWT
  const token = await jwt.sign(tokenPayload, jwtSecretKey);
  // console.log(token);

  await Users.findByIdAndUpdate(user._id, {token: token});

  res.json({
    success: true,
    message: "User successfully logged In",
    token: token,
  });
});

const logoutUser = asyncFunction(async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.decode(token);

  await Users.findByIdAndUpdate(decodedToken._id, {token: ""});

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
