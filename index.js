const express = require("express");
const app = express();
// const env = require("dotenv");
// env.config();
const cors = require("cors");
const DBConnection = require("./DB/DBConnection");
const port = 4000;
const videoRouter = require("./Routes/video.router");
const likedVideoRouter = require("./Routes/likedVideos.router");
const watchLaterRouter = require("./Routes/watchLater.router");
const historyRouter = require("./Routes/history.router");
const playlistRouter = require("./Routes/playlist.router");
const UserRouter = require("./Routes/user.router");
const signupRouter = require("./Routes/signup.router");
const loginRouter = require("./Routes/login.router");
const checkAuth = require("./Middlewares/checkAuth.middleware");

app.use(express.json());
app.use(cors());

DBConnection();

// getData();

app.use("/videos", videoRouter);

// app.use("/signup", signupRouter);
// app.use("/login", loginRouter);
// app.use(checkAuth);
// app.use("/users",checkAuth, UserRouter);
// app.use("/liked-videos",checkAuth, likedVideoRouter);
// app.use("/watch-later",checkAuth, watchLaterRouter);
// app.use("/history",checkAuth, historyRouter);
// app.use("/playlist", checkAuth,playlistRouter);

app.get("/", async (req, res) => {
  res.send("video-library backend Copyright-Aditya Singh");
});
app.listen(process.env.PORT || port, () => {
  console.log(`server started`);
});
