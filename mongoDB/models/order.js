const mongoose = require("mongoose");

const orderSchema = {
  qty: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productId: {
    //relation between the collection user and prodcuts
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", //we have to tell this id is connected to products collection
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
};

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
