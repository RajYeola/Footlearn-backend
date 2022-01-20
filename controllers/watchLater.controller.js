const WatchLater = require("../models/watchLater.model");

const getWatchLaterVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const watchLaterVideos = await WatchLater.findById(userID).populate(
      "videos"
    );

    res.json({ success: true, watchLaterVideos });
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't access liked videos",
      errorMessage: error.message,
    });
  }
};

const addVideoToWatchLaterVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const video = req.body;
    const user = await WatchLater.findById(userID);

    if (!user) {
      const newWatchLater = new WatchLater({
        _id: userID,
        videos: [{ _id: video._id }],
      });

      await newWatchLater.save();

      res.json({
        success: true,
        message: "Created new document and added video to it",
        newWatchLater,
      });
    } else {
      const newVideo = { _id: video._id };
      user.videos.push(newVideo);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Successfully added video to watch later videos",
        user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error adding video to watch later videos",
      errorMessage: error.message,
    });
  }
};

const removeVideoFromWatchLaterVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const { videoID } = req.params;
    const user = await WatchLater.findById(userID);

    await user.videos.remove(videoID);
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to remove video from watch later videos",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getWatchLaterVideos,
  addVideoToWatchLaterVideos,
  removeVideoFromWatchLaterVideos,
};
