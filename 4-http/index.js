const http = require("node:http");

const sampleData = [
  {name: "anand", id: 1},
  {name: "raj", id: 2},
  {name: "md", id: 3},
];
const sampleDataString = JSON.stringify(sampleData);

//this server callback fun will run on every request
const server = (request, response) => {
  // console.log("SERVER IS UP AND RUNNING...");
  // console.log(request);
  console.log(request.url);
  console.log(request.method);
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
  response.end(); //server sends the response back to the client
};

//this will run when server is up
const onServerUp = () => {
  console.log("Server is up and running on port 9999");
};

// http.createServer(server).listen(9999, onServerUp);

const myServer = http.createServer();

myServer.on("request", server);

myServer.listen(9999, onServerUp);
