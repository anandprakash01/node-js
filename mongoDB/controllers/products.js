const Products = require("../models/products.js");

const productsList = async (req, res) => {
  console.log(req.query);
  const pageSize = Number(req.query.pageSize);
  let rating = req.query.rating;
  let pageNo = Number(req.query.pageNo);
  let searchKey = req.query.searchKey;

  if (!req.query.rating) {
    return res.json({
      success: false,
      message: "Rating is not available in query parameter",
    });
  }
  rating = Number(rating);

  //if rating is not passed our app will crash thats why always write crud(dataBase) operation in try/catch and take care all the cases

  // console.log(Products);
  // const products = await Products.find({rating: {$gt: 4.5, $lt: 4.6}});
  const query = {
    rating: {$gte: 0, $lte: rating},
    price: {$gt: 0},
    // title: /shoe/i, //reguler Expression for searching all title having "cloth"
    title: {
      $regex: new RegExp(searchKey),
      $options: "i", //case insensitive
    },
  };

  const skip = (pageNo - 1) * pageSize;
  // const products = await Products.find(query).limit(pageSize).skip(skip);
  const products = await Products.find(query).skip(skip).limit(pageSize);
  const total = await Products.find(query).count();
  const remaining = await Products.find(query).count().skip(skip);

  res.json({
    success: true,
    total: total,
    remaining: remaining,
    currentPage: pageNo,
    pageSize: pageSize,
    // result: [{}],
    result: products,
  });
};

const productDetails = async (req, res) => {
  let productId = req.params.productid;
  // console.log(productId);

  try {
    const product = await Products.findById(productId);
    // console.log(product);
    res.json({
      success: true,
      result: product,
    });
  } catch {
    res.status(404).json({
      success: false,
      result: "Product Not Found",
    });
  }
};

const addProduct = async (req, res) => {
  const productData = req.body;
  // console.log(productData);

  // node.js level validation
  if (!productData.title) {
    return res.status(400).json({
      success: false,
      message: "Title field is required",
    });
    // return;
  }

  // also add validation to "Frontend Level"

  try {
    //insert Data
    // it will not add the data untill all the required field is passed (i.e added in schema(schema level validation));
    const product = new Products({
      title: productData.title,
      price: productData.price,
      brand: productData.brand,
      category: productData.category,
    });
    const result = await product.save(); //asynchronous
    console.log(result);

    res.json({
      success: true,
      message: `New Product added Successfully with id: ${result._id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(300).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    // =====> QueryFirst approch
    const productId = req.params.productId;

    const product = await Products.findById(productId);
    // console.log(product);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id / Product not found",
      });
    }
    // const findObj = {
    // _id: product._id,
    // };
    // const updateObj = req.body;

    // const updatedProd = await Products.updateOne(findObj, updateObj);

    // console.log(updatedProd);

    // =====>UpdateFirst approch

    //no need to find direct update
    const findObj = {
      // _id: product._id,
      _id: productId,
    };
    const updateObj = req.body;

    const updatedProd = await Products.updateOne(findObj, updateObj);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await Products.findByIdAndDelete(productId);
    console.log(result);
    /*  findByIdAndDelete(findObj)
        deleteMany(findObj)   */

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "product with given id does not exist",
      });
    }
    res.json({
      success: true,
      message: `product deleted Successfully id: ${result._id}`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const reviewProduct = async (req, res) => {
  const productId = req.params.productId;
  const updateObj = {
    $set: {
      reviews: req.body,
    },
  };

  const result = await Products.findByIdAndUpdate(productId, updateObj);
  console.log(result);

  res.json({
    success: true,
    message: "reviews Updated",
  });
};

// for only seller
const getRegisteredProduct = async (req, res) => {
  res.json({
    success: true,
    message: "This is registered products end-point",
  });
};

module.exports = {
  productsList,
  productDetails,
  addProduct,
  editProduct,
  deleteProduct,
  reviewProduct,
  getRegisteredProduct,
};
