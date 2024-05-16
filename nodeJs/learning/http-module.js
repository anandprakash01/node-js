const http = require("node:http"); //Common js Emport (CJS)

// import http from "node:http";// ES6 import(ECMAScript)

// Sample JSON data
const sampleData = [
    {name: "anand", id: 1},
    {name: "raj", id: 2},
    {name: "md", id: 3},
];
const sampleDataString = JSON.stringify(sampleData);

const httpModule = () => {
    //creating server
    http.createServer((req, res) => {
        // this call back fun runs on every request
        console.log("Server is Getting Request on 9999 Port");
        res.end(); //res.end() sends the response back to the client
    }).listen(9999, () => {
        console.log("Server is Up and Running...Port::9999");
    });

    //this server callback fun will run on every request
    const server = (request, response) => {
        // console.log(request);
        console.log(request.url);
        console.log(request.method);
        // console.log(request.headers);
        if (request.url == "/") {
            if (request.method == "GET") {
                // response.write("This is Home route, This is GET request");
                response.end(sampleDataString);
            } else if (request.method == "POST") {
                response.write("This route will be user to create New detail");
            }
        } else if (request.url == "/my-profile") {
            response.write("This is my Profile");
        } else {
            response.write(`Error 404, request route ${request.url} not found`);
        }
        response.end();
    };

    //this will run when server is up
    const onServerUp = () => {
        console.log("Server is up and running on port 8080");
    };

    // we have ports till 65000
    // http.createServer(server).listen(9999, onServerUp);

    const myServer = http.createServer();

    myServer.on("request", server); // listen on "request" event, emitted by node.js internally

    //server Up
    myServer.listen(8080, onServerUp);
};

module.exports = httpModule;
