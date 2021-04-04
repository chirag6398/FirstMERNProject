const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("i am from auth file");
});

router.post("/register", (req, res) => {
  console.log(req.body);
});
module.exports = router;
