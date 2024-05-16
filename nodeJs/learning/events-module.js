const fs = require("node:fs");
const events = require("node:events");

const myEmitter = new events.EventEmitter();

const eventsModule = () => {
  //Listen to the event

  myEmitter.on("signalChange", e => {
    // e=> signolColor
    //   console.log("MY EVENT LISTNER IS WORKING", signalColor);
    const msg = new Date().toLocaleString() + " Signal changed to " + e + "\n";
    fs.appendFile("signal.log", msg, error => {
      if (error) {
        console.log("ERROR WHILE WRITING LOG", error);
      }
    });
  });

  //emit an event

  const signalColors = ["GREEN🟢", "YELLOW🟡", "RED🔴"];
  let counter = 0;

  setInterval(() => {
    const index = counter % 3;
    counter++;
    myEmitter.emit("signalChange", signalColors[index]); // in every 5 sec it will emit an event
  }, 5000);
};

module.exports = eventsModule;
