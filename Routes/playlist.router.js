const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { playlist } = await User.findOne()
      .populate("playlist.playlistVideos")
      .exec();
    res.status(200).json({ status: true, playlist });
  })
  .post(async (req, res) => {
    try {
      const playlistReq = req.body;
      let { playlist } = await User.findOne();
      const isPlaylistavailable = playlist.find(
        (item) => item.playlistName == playlistReq.playlistName
      );
      if (isPlaylistavailable) {
        const filteredPlaylist = playlist.filter(
          (item) => item._id !== isPlaylistavailable._id
        );
        const response = await User.updateOne({ playlist: filteredPlaylist });
        res.status(201).json({ status: true, response });
      } else {
        playlist = [
          ...playlist,
          { playlistName: playlistReq.playlistName, playlistVideos: [] },
        ];
        const response = await User.updateOne({ playlist: playlist });
        res.status(201).json({ status: true, response });
      }
    } catch (err) {
      res.status(500).json({ success: false, errmessage: err });
    }
  });

router.route("/video").post(async (req, res) => {
  try {
    const videoReq = req.body;
    const { playlist } = await User.findOne();
    let targetPlaylist = playlist.find(
      (item) => item._id == videoReq.playlistId
    );

    const isVideoPresent = targetPlaylist.playlistVideos.find(
      (item) => item == videoReq.videoId
    );

    console.log(isVideoPresent);

    if (isVideoPresent) {
      const filteredArray = targetPlaylist.playlistVideos.filter(
        (item) => item != videoReq.videoId
      );
      console.log(filteredArray);
      const response = await User.updateOne(
        {
          "playlist._id": targetPlaylist._id,
        },
        { $set: { "playlist.$.playlistVideos": filteredArray } }
      );
      res.status(201).json({ status: true, response });
    } else {
      targetPlaylist.playlistVideos = [
        ...targetPlaylist.playlistVideos,
        videoReq.videoId,
      ];
      const response = await User.updateOne(
        {
          "playlist._id": targetPlaylist._id,
        },
        { $set: { "playlist.$.playlistVideos": targetPlaylist.playlistVideos } }
      );
      res.status(201).json({ status: true, response });
    }
  } catch (err) {
    res.status(500).json({ success: false, errmessage: err });
  }
});

module.exports = router;
