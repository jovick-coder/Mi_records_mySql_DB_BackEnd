const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userAuthRouter = require("./router/userAuthRouter");
const socialLinks = require("./router/socialLink");
const userTodo = require("./router/todo");

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api", userAuthRouter);
app.use("/api/social-links", socialLinks);
app.use("/api/todo", userTodo);

// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message + ".",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
