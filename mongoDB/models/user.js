const mongoose = require("mongoose");

const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
};

const Users = mongoose.model("users", userSchema); //users=>collectionName in DB

module.exports = Users;
