const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// below line is added only in same folder only

dotenv.config({ path: "./config.env" });

require("./db/conn");

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(require("./Routes/auth"));

// app.get("/signup", (req, res) => {
//   res.send("hello from register");
// });

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
