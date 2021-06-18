const express = require("express");
const { User } = require("../Models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userID } = req.user;
    const { playlist } = await User.findById(userID)
      .populate("playlist.playlistVideos")
      .exec();
    res.status(200).json({ status: true, playlist });
  })
  .post(async (req, res) => {
    const { userID } = req.user;
    try {
      const playlistReq = req.body;
      let { playlist } = await User.findById(userID);
      const isPlaylistavailable = playlist.find(
        (item) => item.playlistName == playlistReq.playlistName
      );
      if (isPlaylistavailable) {
        const filteredPlaylist = playlist.filter(
          (item) => item._id !== isPlaylistavailable._id
        );
        const response = await User.updateOne(
          { _id: userID },
          {
            playlist: filteredPlaylist,
          }
        );
        res.status(201).json({ status: true, response });
      } else {
        playlist = [
          ...playlist,
          { playlistName: playlistReq.playlistName, playlistVideos: [] },
        ];
        const response = await User.updateOne(
          { _id: userID },
          {
            playlist: playlist,
          }
        );

        const { playlist: newPlaylist } = await User.findOne({ _id: userID });
        const newPlaylistId = newPlaylist.find(
          (item) => item.playlistName === playlistReq.playlistName
        );
        res
          .status(201)
          .json({ status: true, response, playlistID: newPlaylistId._id });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, errmessage: err });
    }
  });

router.route("/video").post(async (req, res) => {
  const { userID } = req.user;
  try {
    const videoReq = req.body;
    const { playlist } = await User.findById(userID);
    let targetPlaylist = playlist.find(
      (item) => item._id == videoReq.playlistId
    );

    const isVideoPresent = targetPlaylist.playlistVideos.find(
      (item) => item == videoReq.videoId
    );

    if (isVideoPresent) {
      const filteredArray = targetPlaylist.playlistVideos.filter(
        (item) => item != videoReq.videoId
      );
      console.log(filteredArray);
      const response = await User.updateOne(
        {
          _id: userID,
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
          _id: userID,
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
