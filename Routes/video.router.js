const express = require("express");
const router = express.Router();
const { Video } = require("../Models/video.model");

router.route("/").get(async (req, res) => {
  const videos = await Video.find();
  res.status(200).json({ status: true, videos });
});

module.exports = router;
