const express = require("express");
const app = express(); //http.createServer()

// express.json();// pass inside app.use(); this is the way to get request.body
app.use(express.json()); //Middleware

const myAuthMiddleware = (req, res, next) => {
  console.log(req.url);
  console.log(req.query);
  console.log(req.query.apikey == "asdk-adk-adf-adf");
  console.log(req.headers);

  console.log("Inside Middleware");
  // Security check
  if (req.body.token === 12345) {
    // if request is valid Input. it contains correct token(username and password)
    next();
  } else {
    res.status(401).json({
      message: "Access denied",
    });
  }
  // next();
};

// app.use(myAuthMiddleware); //App level middleware

//GET request:
app.get("/", (request, response) => {
  response.send("The express server is up");
});

app.get("/user", (req, res) => {
  const user = {
    id: 1,
    name: "anand",
    address: "abc/12",
  };
  res.json(user);
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  const dynamicUserId = {
    userId: req.params.userId,
  };
  res.status(201).json(dynamicUserId);
});

//POST request:
app.post("/user", myAuthMiddleware, (req, res) => {
  console.log(req.body); //to get body use middleware
  console.log("API End Point");
  const responseJson = {
    success: true,
    message: "User Created successfully",
  };
  res.json(responseJson);
});

// PUT request:
app.put("/user", (req, res) => {
  const putResponse = {
    success: true,
    message: "User replaced successfully",
  };
  res.json(putResponse);
});

// DELETE request:
app.delete("/user", (req, res) => {
  const deleteResponse = {
    success: true,
    message: "User deleted successfully",
  };
  res.json(deleteResponse);
});

const port = 8080;

//Server up
app.listen(port, () => {
  //server.listen()
  console.log("Server is up and running on port", port);
});

// --------environment variable----------

// console.log(process.env);
// process.env.anand="anand";

require("dotenv").config(); //merges the .env file environment and system environment
console.log(process.env.SECRET_NUMBER);

app.get("/number", (req, res) => {
  const secretNum = process.env.SECRET_NUMBER;
  if (secretNum) {
    res.json({
      number: secretNum,
    });
  } else {
    res.status(404).json({
      error: "Not found",
    });
  }
});
