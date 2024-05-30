const serverModule = require("./learning/server");
const middleware = require("./learning/middlewere");

const userRouter = require("./learning/routes/user-route.js");
const cartRouter = require("./learning/routes/cart.js");

const express = require("express");
const app = express();

// serverModule();
// middleware();

const port = 8080;

app.use(express.json()); //app level middlewere

const moduleLevelmiddleware = (req, res, next) => {
  next();
};

// app.use(userRouter); //connects userRoutes with app
app.use("/api/v1/user", moduleLevelmiddleware, userRouter); //add common parts or route
app.use("/api/v1/cart", cartRouter); //add common parts or route

app.listen(port, () => {
  console.log("Server is up and Running at:", port);
});
