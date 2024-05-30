const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.js");

router.post("/create", orderController.createOrder);

router.get("/list", orderController.listOrder);

module.exports = router;
