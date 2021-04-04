const dotenv = require("dotenv");
const express = require("express");
const app = express();

// below line is added only in same folder only
dotenv.config({ path: "./config.env" });
require("./db/conn");

const PORT = process.env.PORT;

// Middleware

const middleware = (req, res, next) => {
  console.log("hello i am middleware");
  next();
};

// middleware ends

// require("./Routes/routes");

app.get("/", (req, res) => {
  res.send("hello from backened");
});

app.get("/aboutme", middleware, (req, res) => {
  res.send("hello from about me");
});

app.get("/contact", (req, res) => {
  res.send("hello from contact");
});

app.get("/signin", (req, res) => {
  res.send("hello from login");
});

app.get("/signup", (req, res) => {
  res.send("hello from register");
});
// routes end
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
