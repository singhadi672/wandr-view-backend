const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'cj2A4RjTiikf83QMpiOZ+qYvvAQNJMLtzjn90O8j6ApJtcdS18JCminhrjgTpCKEKRzbNSxqYln+0sPiM92gscVJymz6jjHtM9H+SrhVbPzi1tmtbhYxxY3tMnkrWk0vlxmW3kby04H/T7xhx7OtRH2aECV1iG9v6DeSjkfFJh05XVzdfThgcmT6BIq7l2XOUor8gtVmg+tcXWQmwvOK5vpifbWO/Sw8eO659wDVF4X5wpIKPgXqn96SBFFOwb3PWpFLRQTZSgBOP0hwEPKICFOPaCpcXVtu978uez/3YVWNc0Yir1BMSzEt8qs8gfimm339KIGs0p7D9zkWLiuUrg=='
const saltRounds = 10

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
