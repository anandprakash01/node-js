const express = require("express");
const router = new express.Router();

const cartController = require("../controllers/cart");

router.get("/", cartController.cart);
router.get("/add", cartController.addToCart);

router.get("/remove", cartController.removeFromCart);

router.get("/order", cartController.orderCart);

module.exports = router;
