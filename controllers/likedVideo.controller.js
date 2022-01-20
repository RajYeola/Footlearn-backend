const LikedVideo = require("../models/likedVideo.model");

const getLikedVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const likedVideos = await LikedVideo.findById(userID).populate("videos");

    res.json({ success: true, likedVideos });
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't access liked videos",
      errorMessage: error.message,
    });
  }
};

const addVideoToLikedVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const video = req.body;

    const user = await LikedVideo.findById(userID);

    if (!user) {
      const newLikedVideo = new LikedVideo({
        _id: userID,
        videos: [{ _id: video._id }],
      });

      await newLikedVideo.save();

      res.json({
        success: true,
        message: "Created new document and added video to it",
        newLikedVideo,
      });
    } else {
      const newVideo = { _id: video._id };
      user.videos.push(newVideo);
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Added video to liked videos", user });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error adding video to liked videos",
      errorMessage: error.message,
    });
  }
};

const removeVideoFromLikedVideos = async (req, res) => {
  try {
    const { videoID } = req.params;
    const { userID } = req.user;

    const user = await LikedVideo.findById(userID);
    await user.videos.remove(videoID);
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to remove video from liked videos",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getLikedVideos,
  addVideoToLikedVideos,
  removeVideoFromLikedVideos,
};
