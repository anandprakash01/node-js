const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewTitle: String,
  reviewDescription: String,
});

const productSchema = {
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: false,
    default: 0,
    max: 60,
    // validate:()=>{} Custom validation in mongooes
  },
  rating: {
    type: Number,
    required: false,
    default: 5,
  },
  stock: {
    type: Number,
    required: false,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  images: {
    type: Array,
    required: false,
    default: [],
  },
  //Arrays of sub-documents
  reviews: [reviewSchema],
};

const Products = mongoose.model("products", productSchema); //products=>collectionName in DB

module.exports = Products;
