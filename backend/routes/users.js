const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid username or password!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid username or password!",
        });
      }
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id },
        "03e7b006b118042833d28b164c9aef85fefc1cffbf0723d8b3761efcc028fbcc",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      if(fetchedUser) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }
    });
});

module.exports = router;
