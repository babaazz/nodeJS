const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const path = require("path");

const PORT = process.env.PORT || 3500;

// Custom Middleware for log events

app.use(logger);

//Adding credentials header to response object
//To handle fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

//Built-in middleware for url encoding for form data
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for json
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Built-in middleware for static files

app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/emps", require("./routes/api/emp"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (res.accepts("json")) {
    res.json({ error: "404: page not found" });
  } else {
    res.type("text").send("404: page not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
