const fs = require("fs");
// let text = fs.readFileSync("test.txt", "utf-8");
// console.log(text);
// let text = fs.readFile("test.txt", "utf-8", () => { });
// console.log(text);//this will give undefined coz readFile is Asynchronous

let text = fs.readFile("test.txt", "utf-8", (err, data) => {
    console.log(err, data);
});
console.log(text);//this will give undefined coz readFile is Asynchronous

//creating file and adding text
let content = "🐕 This is the text which is being written inside new file🙌😉😊☯️🐈";
fs.writeFileSync("./test2.txt", content);