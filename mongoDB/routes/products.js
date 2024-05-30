const express = require("express");
const router = express.Router();

const grantAccessTo = require("../middlewares/role.js");

const productController = require("../controllers/products.js");

router.get("/list", productController.productsList);

router.get("/details/:productid", productController.productDetails);

router.post("/add", productController.addProduct);

router.patch("/edit/:productId", productController.editProduct);

router.delete("/delete/:productId", productController.deleteProduct);

router.post("/review/:productId", productController.reviewProduct);

// for only seller
router.get("/registered-products", grantAccessTo, productController.getRegisteredProduct);

module.exports = router;
