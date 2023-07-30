const http = require('http');
const fs = require('fs');

const hostName = '127.0.0.1';
const port = 2000;

const home = fs.readFileSync('./home.html');
const contact = fs.readFileSync('./contact.html');
const about = fs.readFileSync('./about.html');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    const url = req.url;
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    if (url == '/' || url == '/home') {
        res.end(home);
    }
    else if (url == '/about') {
        res.end(about);
    }
    else if (url == '/contact') {
        res.end(contact);
    }
    else {
        res.statusCode = 404;
        res.end('<h1>404 Not found</h1>');
    }
});
server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`);
})
