const fs = require("node:fs");
const express = require("express");

const app = express(); //http.createServer()

const serverModule = () => {
    //GET request:
    app.get("/", (request, response) => {
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

    app.post("/user", (req, res) => {
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

    const port = 9000;

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
    app.get("/get-file", (req, res) => {
        console.log(req.body);
        // res.json("Response Done");
        fs.readFile("./testFiles/testFile.txt", (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "Something went wrong, while reading file",
                });
            } else {
                const fileData = data.toString();
                res.json({
                    data: fileData,
                });
            }
        });
    });

    // if files folder has more files then one, we can not follow above approch. so we use middlewere

    // app.use(express.static("files"));
    // every file inside this folder can be directly acces from statically(Considered as static file)
    // middlewere to serve files from perticuler folder. this will not consider fileName as route
};

module.exports = serverModule;
