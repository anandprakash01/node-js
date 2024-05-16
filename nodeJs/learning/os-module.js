// const os = require("os");
const os = require("node:os");

const {clear} = require("node:console");
const {uptime} = require("node:process");

const osModule = () => {
  // console.log(os);
  console.log(os.arch());

  // console.log(os.cpus());
  console.log("Cores available in this CPU : ", os.cpus().length);

  console.log("A", os.EOL, "B");
  console.log("A\nB");

  console.log(os.freemem());
  console.log(os.hostname());
  console.log(os.homedir());
  console.log(os.tmpdir());
  console.log(os.userInfo());
  console.log(os.uptime() / 3600);
  // console.log(os.networkInterfaces());
  console.log(os.platform());
  console.log(os.release());
  console.log(os.type());
  console.log(os.version());
  // console.log(os.constants);
  // console.clear();
};

module.exports = osModule;
