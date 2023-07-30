const http = require("node:http");

http
  .createServer(() => {
    console.log("SERVER IS UP AND RUNNING...");
  })
  .listen(9999);
