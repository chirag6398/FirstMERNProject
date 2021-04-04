const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backened");
});

app.get("/aboutme", (req, res) => {
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
