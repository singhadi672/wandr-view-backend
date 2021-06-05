const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  playlist: [
    {
      playlistName: String,
      playlistVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    },
  ],
  watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };

// async function dasa() {
//   const { _id } = await Video.findOne();
//   const data = {
//     likedVideos: [{ _id }],
//     playlist: [{ playlistName: "My Playlist", playlistVideos: [{ _id }] }],
//     watchLater: [{ _id }],
//     history: [{ _id }],
//   };

//   const user = new User(data);
//   const resp = await user.save();
//   console.log(resp);
// }
