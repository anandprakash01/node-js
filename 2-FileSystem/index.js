// =======================File module=================

const fs = require("node:fs");

// fs.writeFile(filePath,filecontent,callbackfun)
// if the file name given is already exist it will override that file and its content

const fileName = "sample.txt";

// --------------writeFile--------------------------
const writeFile = () => {
  fs.writeFile(
    fileName,
    "Hello this is a file created by node js fs module\n",
    (error) => {
      console.log(error);
    }
  );
};
// writeFile();

// ------------------Update File-----------------
const appendFile = () => {
  // fs.appendFile(fileName, "this is updated content\n", (error) => {
  //   if (error) {
  //     console.log(error);
  //   }
  // });

  // if there is no such file named fileName it will create file

  const msg = new Date().toLocaleString() + " User LogOut activity \n";
  // Asynchronus type
  fs.appendFile(fileName, msg, (error) => {
    if (error) {
      console.log(error);
    }
  });
  // synchronus type
  //   fs.appendFileSync("sample.txt", msg);
};
// appendFile();

// --------------readFile---------------------
const readFile = () => {
  const text = fs.readFile(fileName, (error, data) => {
    if (error) {
      //if fileName does not exist then it will give error
      console.log("ERROR WHILE READING FILE", error);
      return;
    }
    // console.log(data); //this is buffer data
    console.log(data.toString()); //this is text data
  });

  console.log(text); // this will give undefineed because it asynchronous

  // const text2 = fs.readFileSync(fileName, (error, data) => {
  //   if (error) {
  //     console.log("ERROR WHILE READING FILE", error);
  //     return;
  //   }
  //   console.log(data.toString());
  // });
  // console.log(text2.toString()); //this is synchronous thats why it is giving data
};
// readFile();

// --------------------deleteFile-----------------
const deleteFile = () => {
  fs.unlink(fileName, (error) => {
    if (error) {
      console.log("Error while deleting file: ", error);
      return;
    }
    console.log("File ", fileName, "Deleted SUCCESSFULLY");
  });
};
// deleteFile();

// -------------------createFolder-------------
const createFolder = () => {
  const folderName = "logs";
  fs.mkdir(folderName, (err) => {
    if (err) {
      console.log("ERROR CREATING FOLDER");
      return;
    }
    console.log("Folder created successfully");
  });
};
// createFolder();

// ---------------check folder/file exists--------------
const folderExists = () => {
  const exists = fs.existsSync("logs");
  console.log(exists);
};
folderExists();
