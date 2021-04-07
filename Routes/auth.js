const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", async (req, res) => {
  res.send("i am from auth file");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(422).json({ error: "plz filled all fields" });
    }
    userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (cpassword !== password) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword }); //creation of new document in collection users

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "register successfully" });
      } else {
        res.status(500).json({ error: "unsuccessful register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "plz fill all field" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      token = await userExist.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      if (!isMatch) {
        console.log(userExist);
      } else {
        console.log("invalid password");
        res.status(422).json({ errror: "password wrong" });
      }
    } else {
      console.log("invalid credentials");
      res.status(422).json({ errror: "user not exit with this email" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

// using promises
// User.findOne({ email: email })
//   .then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "email already exist" });
//     }
//     const user = new User({ name, email, phone, work, password, cpassword }); //creation of new document in collection users
//     user
//       .save()
//       .then(() => {
//         res.status(201).json({ message: "user registered successfully" });
//       })
//       .catch((err) =>
//         res.status(500).json({ error: "failed registeration" })
//       );
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// using async await
