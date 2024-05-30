// const winston = require("winston");
const {createLogger, format, transports} = require("winston");

// const transports = [new winston.transports.Console()]; // all the logs that logger will write, will be in console

const transportsArray = [
  new transports.Console(),
  new transports.File({
    direname: __dirname, //current directory/folder
    filename: "user.log",
  }),
]; //this will log, in console and file

const logger = createLogger({
  level: "info", // type of log
  //   format: winston.format.json(),
  format: format.json(),
  transports: transportsArray,
});

//check loginUser inside userControllers for the usages(Used there)

module.exports = logger;
