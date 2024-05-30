const express = require("express");
const app = express();
const mongoose = require("mongoose");
const responseTime = require("response-time");
const cors = require("cors");

require("dotenv").config();

const productRoutes = require("./routes/products.js");
const userRoutes = require("./routes/users.js");
const orderRoutes = require("./routes/order.js");
const cartRoutes = require("./routes/cart.js");

const authMiddleware = require("./middlewares/auth.js");
const errorMiddleware = require("./middlewares/error.js");

const port = 8080;

// in what sequence we pass middleware it will be called in that sequence only
app.use(express.json()); //to get the data from the body
app.use(responseTime());
app.use(cors()); //cross origin resource sharing

app.use("/api/v1/products", authMiddleware, productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/order/", authMiddleware, orderRoutes);
app.use("/api/v1/cart", authMiddleware, cartRoutes);

//The 404 Route
app.get("*", (req, res) => {
  res.status(404);
  // res.send("what???", 404);

  // respond with html page
  // if (req.accepts("html")) {
  //   res.render("404", {url: req.url});
  //   return;
  // }

  // respond with json
  if (req.accepts("json")) {
    res.json({error: "Not found"});
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

//this middleware will be called after the end-point
// app.use(errorMiddleware);

// console.log(process.env.MONGO_URI);

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI); //localhost=> 127.0.0.1
};

connectDB()
  .then(() => {
    console.log("Connection to database is established");
  })
  .catch(err => {
    console.log("UNABLE TO CONNECT TO DATABASE", err);
  });

app.listen(port, () => {
  console.log("Server is up and running at:", port);
});
