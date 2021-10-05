const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config({ path: "./config.env" });

require("./db/conn");

const PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "client/build")));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(require("./Routes/auth"));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
