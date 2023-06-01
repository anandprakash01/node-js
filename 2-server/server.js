const http = require('http');
const { text } = require('stream/consumers');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

const fs = require('fs');
const htmlContent = fs.readFileSync('./test.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(htmlContent);
});
server.listen(80, '127.0.0.1', () => {
    console.log("listing on port 127.0.0.1:80");
});