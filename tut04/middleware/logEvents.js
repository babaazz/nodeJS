const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvents = async (logFile, message) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:dd");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents("reqLog.txt", `${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};

module.exports = { logEvents, logger };
