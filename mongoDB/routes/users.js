const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");

router.post("/register", usersController.registerUser);

router.post("/login", usersController.loginUser);

router.get("/logout", usersController.logoutUser);

module.exports = router;
