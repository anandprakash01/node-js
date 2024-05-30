const express = require("express");
const jwt = require("jsonwebtoken");

const grantAccessTo = async (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token);

  const decodedToken = jwt.decode(token);
  //   console.log(decodedToken);

  if (decodedToken.role != "seller") {
    return res.json({
      success: false,
      message: "Customer can not access the seller features",
    });
  }

  //   res.json({
  //     success: true,
  //     message: "This is from middleware",
  //   });
  next();
};

module.exports = grantAccessTo;
