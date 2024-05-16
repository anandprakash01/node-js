const fs = require("node:fs");
const express = require("express");

const app = express(); //http.createServer()

// express.json();//this is build in middlewere// pass inside app.use(); this is the way to get request.body (in json Format)

// app.use(myAuthMiddleware); //App level middleware

const middlewere = () => {
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
    app.get("/user/:userId", (req, res) => {
        console.log(req.params);
        const dynamicUserId = {
            userId: req.params.userId,
        };
        // res.json(dynamicUserId);
        res.status(201).json(dynamicUserId);
    });

    //this should be anywhere before in which request url this middlewere is passesed
    // app.use(express.json()); // app.use()=>Middleware and-> express.json() is a way to get request body
    app.use(express.urlencoded({extended: true})); // middleware to get url encoded data from body

    //POST request:
    // here myAuthMiddleware is API level and this will only check on this url with same method i.e post
    app.post("/user", myAuthMiddleware, (req, res) => {
        console.log(req.body); //to get body use middleware otherwise it will undefined
        console.log("Reached API End Point");
        const responseJson = {
            success: true,
            message: "User Created successfully",
        };
        res.json(responseJson);
    });

    const port = 8000;

    //Server up
    app.listen(port, () => {
        //server.listen() //this was in node js
        console.log("Server is up and running on port", port);
    });

    // =========================================
    //read File/Folder

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
};

module.exports = middlewere;

// if files folder has more files then one, we can not follow above approch. so we use middlewere

// app.use(express.static("files"));
// every file inside this folder can be directly acces from statically(Considered as static file)
//middlewere to serve files from perticuler folder. this will not consider fileName as route
