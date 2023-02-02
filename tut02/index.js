const logEvents = require("./logEvents");

const EventEmmiter = require("events");

class MyEmitter extends EventEmmiter {}

// Initialize object
const myEmitter = new MyEmitter();

//Add listener for log events
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //emit event
  myEmitter.emit("log", "Log event emitted");
}, 2000);
