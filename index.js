const express = require("express");
const app = express();
const cors = require("cors");
const DBConnection = require("./DB/DBConnection");
const port = 4000;
const videoRouter = require("./Routes/video.router");
const likedVideoRouter = require("./Routes/likedVideos.router");
const watchLaterRouter = require("./Routes/watchLater.router");
const historyRouter = require("./Routes/history.router");
const playlistRouter = require("./Routes/playlist.router");
const UserRouter = require("./Routes/user.router");

app.use(express.json());
app.use(cors());

DBConnection();

app.use("/users", UserRouter);
app.use("/videos", videoRouter);
app.use("/liked-videos", likedVideoRouter);
app.use("/watch-later", watchLaterRouter);
app.use("/history", historyRouter);
app.use("/playlist", playlistRouter);

app.get("/", async (req, res) => {
  res.send("video-library backend Copyright-Aditya Singh");
});
app.listen(process.env.PORT || port, () => {
  console.log(`server started`);
});
