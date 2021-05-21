const express = require("express");
const router = express.Router();
const { User } = require("../Models/user.model");

router.route("/").get(async (req, res) => {
  const data = await User.findOne()
    .populate("likedVideos")
    .populate("watchLater")
    .populate("history")
    .populate("playlist.playlistVideos")
    .exec();
  res.status(200).json({ status: true, user: data });
});

module.exports = router;
