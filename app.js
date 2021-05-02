const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

require("./db/conn");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(require("./Routes/auth"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
