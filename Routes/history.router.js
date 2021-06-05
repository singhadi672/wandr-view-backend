const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userID } = req.user;
    const { history } = await User.findById(userID).populate("history").exec();
    res.status(200).json({ status: true, history });
  })
  .post(async (req, res) => {
    const { userID } = req.user;
    try {
      const newVideo = req.body;
      if (newVideo.clear) {
        const response = await User.updateOne({ id: userID, history: [] });
        res.status(204).json({ success: true, message: "history cleared" });
      } else {
        let { history } = await User.findById(userID);
        const isVideoPresent = history.find((item) => item == newVideo.id);
        if (isVideoPresent) {
          res
            .status(201)
            .json({ status: false, message: "video already present" });
        } else {
          history = [...history, newVideo.id];
          const response = await User.updateOne(
            { _id: userID },
            {
              history: history,
            }
          );
          res.status(201).json({ status: true, response });
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, errmessage: err });
    }
  });

module.exports = router;
