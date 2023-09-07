const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userID } = req.user;
    const { watchLater } = await User.findById(userID)
      .populate("watchLater")
      .exec();
    res.status(200).json({ status: true, watchLater });
  })
  .post(async (req, res) => {
    const { userID } = req.user;
    try {
      const newVideo = req.body;
      let { watchLater } = await User.findById(userID);
      const isVideoPresent = watchLater.find((item) => item == newVideo.id);
      if (isVideoPresent) {
        const filteredArray = watchLater.filter((item) => item != newVideo.id);
        const response = await User.updateOne(
          { _id: userID },
          {
            watchLater: filteredArray,
          }
        );
        res.status(201).json({ status: true, response });
      } else {
        watchLater = [...watchLater, newVideo.id];
        const response = await User.updateOne(
          { _id: userID },
          {
            watchLater: watchLater,
          }
        );
        res.status(201).json({ status: true, response });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, errmessage: err });
    }
  });

module.exports = router;
