const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("hello auth home page");
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res
        .status(422)
        .json({ error: "plz filled all fields", status: 422 });
    }
    userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ error: "email already exist", status: 422 });
    } else if (cpassword !== password) {
      return res
        .status(422)
        .json({ error: "password is not matching", status: 422 });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword }); //creation of new document in collection users

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "register successfully" });
        console.log("data saved from registration");
      } else {
        res.status(500).json({ error: "unsuccessful register" });
        console.log("data not saved from registration");
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
      return res.status(422).json({ error: "plz fill all field", status: 400 });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (isMatch) {
        token = await userExist.generateAuthToken();
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res
          .status(201)
          .json({ message: "user login successfuly", status: 201 });
      } else {
        console.log("invalid password");
        res.status(422).json({ errror: "password wrong", status: 422 });
      }
    } else {
      console.log("invalid credentials");
      res
        .status(422)
        .json({ errror: "user not exit with this email", status: 422 });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/about", authenticate, (req, res) => {
  res.status(201).send(req.rootUser);
});

router.get("/api/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(201).send("user logout successfully");
  console.log("logout router");
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    // console.log(req.body);
    if (!name || !email || !message || !phone) {
      console.log("error in contact form");
      return res
        .status(422)
        .json({ error: "plz fill all fields", status: 422 });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        phone,
        email,
        message
      );

      await userContact.save();
      console.log("usermessage", userMessage);
      res
        .status(201)
        .json({ message: "message saves successfuly", status: 201 });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ error: "internal error", status: 422 });
  }
});

router.get("/getdata", authenticate, (req, res) => {
  res.status(201).send(req.rootUser);
});

module.exports = router;
