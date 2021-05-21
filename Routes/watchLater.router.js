const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { watchLater } = await User.findOne().populate("watchLater").exec();
    res.status(200).json({ status: true, watchLater });
  })
  .post(async (req, res) => {
    try {
      const newVideo = req.body;
      let { watchLater } = await User.findOne();
      const isVideoPresent = watchLater.find((item) => item == newVideo.id);
      if (isVideoPresent) {
        const filteredArray = watchLater.filter((item) => item != newVideo.id);
        const response = await User.updateOne({ watchLater: filteredArray });
        res.status(201).json({ status: true, response });
      } else {
        watchLater = [...watchLater, newVideo.id];
        const response = await User.updateOne({ watchLater: watchLater });
        res.status(201).json({ status: true, response });
      }
    } catch (err) {
      res.status(500).json({ success: false, errmessage: err });
    }
  });

module.exports = router;
