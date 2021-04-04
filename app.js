const express = require("express");
const app = express();

// database
const mongoose = require("mongoose");
const DB =
  "mongodb+srv://chirag:6398356528@cluster0.gha33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("mongoo connection failed");
  });

// database ends
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
app.listen(3000, () => {
  console.log("server is running at port 3000");
});
