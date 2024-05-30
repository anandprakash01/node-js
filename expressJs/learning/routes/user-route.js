const express = require("express");

const userController = require("../controllers/user");

// const app = express();

const router = express.Router();

// Express router
// 1. import express module
// 2. initialize a express router new express.Router()
// 3. change app.get and app.post with router.get and router.post
// 4. connect app and router using app.use(router);
// 5. create a routes folder
// 6. create files in routes folder based on our module requirement
// 7. move the respective routes in their files
// 8. remove the common part of the route and put it in index file with app.use() in step 4

const apiLevelMidlleware = (req, res, next) => {
  next();
};

router.get("/", apiLevelMidlleware, userController.user);

router.get("/id/:userId", userController.userId);

router.post("/create", userController.createUser);

// PUT request:
router.put("/update", userController.updateUser);

// DELETE request:
router.delete("/remove", userController.removeUser);

// to use userRoutes we need to export our router from here
module.exports = router;
