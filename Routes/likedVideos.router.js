const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { likedVideos } = await User.findOne().populate("likedVideos").exec();
    res.status(200).json({ status: true, likedVideos });
  })
  .post(async (req, res) => {
    try {
      const newVideo = req.body;
      let { likedVideos } = await User.findOne();
      const isVideoPresent = likedVideos.find((item) => item == newVideo.id);
      if (isVideoPresent) {
        const filteredArray = likedVideos.filter((item) => item != newVideo.id);
        const response = await User.updateOne({ likedVideos: filteredArray });
        res.status(201).json({ status: true, response });
      } else {
        likedVideos = [...likedVideos, newVideo.id];
        const response = await User.updateOne({ likedVideos: likedVideos });
        res.status(201).json({ status: true, response });
      }
    } catch (err) {
      res.status(500).json({ success: false, errmessage: err });
    }
  });

module.exports = router;
