const Order = require("../models/order.js");

const createOrder = async (req, res) => {
  const orderBody = req.body;

  const order = new Order({
    ...orderBody,
    userId: req.user._id,
  });
  const result = await order.save();
  console.log(result);

  res.json({
    success: true,
    message: `Order Placed, Id :${result._id}`,
  });
};

const listOrder = async (req, res) => {
  // console.log(req.user); // currently loggedin user(comming from Auth middleware)

  const orders = await Order.find({userId: req.user._id})
    .populate("productId")
    .populate("userId");

  res.json({
    success: true,
    total: orders.length,
    result: orders,
  });
};

module.exports = {
  createOrder,
  listOrder,
};
