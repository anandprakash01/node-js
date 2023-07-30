const express = require("express");
const app = express();
const port = 80;

app.get("/", (req, res) => {
    res.send("This is Home Page");
})
app.get("/about", (req, res) => {
    res.status(200).send("This is About Page🐈");
})
//post request
app.post("/about", (req, res) => {
    res.send("This is Post request of About Page🐈");
})
app.get("/404", (req, res) => {
    res.status(404).send("This Page is not Found");
})


app.listen(port, () => {
    console.log(`The server is listing on ${port}`);
})