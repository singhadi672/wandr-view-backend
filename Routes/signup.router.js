const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = process.env.saltRounds;
const secret = process.env.secret;
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).json({ status: false, error: "user already present" });
    } else {
      const salt = await bcrypt.genSalt(parseInt(saltRounds));
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const response = await newUser.save();
      const token = jwt.sign(
        { userID: response._id, username: response.username },
        secret,
        { expiresIn: "6h" }
      );
      res.status(201).json({ status: true, token, user: response });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, error: err });
  }
});

module.exports = router;
