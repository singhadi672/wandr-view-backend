const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const isUserPresent =
      user && (await bcrypt.compare(password, user.password));
    if (isUserPresent) {
      const findUser = await User.findById(user._id)
        .populate("likedVideos")
        .populate("watchLater")
        .populate("history")
        .populate("playlist.playlistVideos")
        .exec();

      const token = jwt.sign(
        { userID: findUser._id, username: findUser.username },
        secret,
        { expiresIn: "6h" }
      );

      res.status(200).json({ status: true, token, user: findUser });
    } else {
      res
        .status(404)
        .json({ status: false, error: "incorrect email/password" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, error });
  }
});

module.exports = router;
