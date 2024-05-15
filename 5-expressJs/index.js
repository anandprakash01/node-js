const fs = require("node:fs");
const express = require("express");

const app = express(); //http.createServer()

// express.json();//this is build in middlewere// pass inside app.use(); this is the way to get request.body (in json Format)
// app.use(express.json()); // app.use()=>Middleware and-> express.json() is a way to get request body

const myAuthMiddleware = (req, res, next) => {
  // console.log(req.url);
  console.log(req.query); // After the ? url
  // console.log(req.query.apikey == "asdk-adk-adf-adf");
  // console.log(req.headers);
  console.log(req.body);

  console.log("Inside Middleware");
  // Security check
  if (req.body.token === 12345) {
    // if request is valid Input.i.e. it contains correct token(username and password)
    next();
  } else {
    res.status(401).json({
      message: "Access denied",
    });
  }
  // next();// only after this it will go on API End Point(next process)
};

// app.use(myAuthMiddleware); //App level middleware

//GET request:: (here myAuthMiddleware is API level)
app.get("/", myAuthMiddleware, (request, response) => {
  // response.send("The express server is up");
  response.json("The express server is up"); // it will send json data
});

app.get("/user", (req, res) => {
  const user = {
    id: 1,
    name: "anand",
    address: "abc/12",
  };
  res.json(user); // it will send json data
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  const dynamicUserId = {
    userId: req.params.userId,
  };
  // res.json(dynamicUserId);
  res.status(201).json(dynamicUserId);
});

//POST request:
app.post("/", (req, res) => {
  res.json("This is post request");
}); //First 1 will listen and response to request
app.post("/", (req, res) => {
  res.json("This is post request 2");
});

app.post("/user", myAuthMiddleware, (req, res) => {
  console.log(req.body); //to get body use middleware otherwise it will undefined
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
  //server.listen() //this was in node js
  console.log("Server is up and running on port", port);
});

// --------environment variable----------

// console.log(process);// Environment variable/current Process
// console.log(process.env);
// process.env.anand="anand";

require("dotenv").config(); //merges the .env file environment and system environment
console.log(process.env.SECRET_NUMBER);

app.get("/number", (req, res) => {
  const secretNum = process.env.SECRET_NUMBER;
  console.log("Number Request from URL:", req.url);
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

// =========================================
//read File/Folder
app.use(express.urlencoded({extended: true})); // middleware to get url encoded data from body

app.get("/get-file", (req, res) => {
  console.log(req.body);
  res.json("Response Done");
  // fs.readFile("./files/testFile.txt", (err, data) => {
  //   if (err) {
  //     res.status(400).json({
  //       message: "Something went wrong, while reading file",
  //     });
  //   } else {
  //     const fileData = data.toString();
  //     res.json({
  //       data: fileData,
  //     });
  //   }
  // });
});

// if files folder has more files then one, we can not follow above approch. so we use middlewere

// app.use(express.static("files"));
// every file inside this folder can be directly acces from statically(Considered as static file)
//middlewere to serve files from perticuler folder. this will not consider fileName as route
