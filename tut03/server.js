const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("log", (logFile, msg) => logEvents(logFile, msg));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );

    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;

    if (filePath.includes("404.html")) {
      response.writeHead(400, { "Content-Type": contentType });
    } else {
      response.writeHead(200, { "Content-Type": contentType });
    }

    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    myEmitter.emit("log", "errorLog.txt", `${error.name}\t${error.message}`);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  myEmitter.emit("log", "reqLog.txt", `${req.url}\t${req.method}`);

  const extn = path.extname(req.url);

  let contentType;

  switch (extn) {
    case ".html":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extn && req.url.slice(-1) !== "/") filePath += ".html";

  console.log(filePath);

  const fileExists = fs.existsSync(filePath);
  console.log(fileExists);

  if (fileExists) {
    //serve the file
    console.log("serving the file");
    serveFile(filePath, contentType, res);
  } else {
    console.log("in 404 or 301 ");
    //404
    //301
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //serve 404
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
