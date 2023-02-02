const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents("errLog.txt", `${err.name}\t${err.message}`);
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
