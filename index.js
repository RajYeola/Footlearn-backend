const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const videoRouter = require("./routes/video.route");
const likedVideoRouter = require("./routes/likedVideo.route");
const userRouter = require("./routes/user.route");
const watchLaterRouter = require("./routes/watchLater.route");
const playlistRouter = require("./routes/playlist.route");
const historyRouter = require("./routes/history.route");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to Footlearn API" });
  } catch (error) {
    res.json({ message: "Unable to fetch API" });
  }
});

app.use("/videos", videoRouter);
app.use("/likedVideo", likedVideoRouter);
app.use("/user", userRouter);
app.use("/watchlater", watchLaterRouter);
app.use("/playlist", playlistRouter);
app.use("/history", historyRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    })
  )
  .catch((error) => console.log(error.message));
