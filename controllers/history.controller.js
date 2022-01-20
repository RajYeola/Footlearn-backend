const History = require("../models/history.model");

const getHistoryVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const historyVideos = await History.findById(userID).populate("videos");

    res.json({
      success: true,
      message: "Successfully fetched history videos",
      historyVideos,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch history videos",
      errorMessage: error.message,
    });
  }
};

const addVideoToHistoryVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const user = await History.findById(userID);
    const { videoID } = req.body;

    if (!user) {
      const newHistoryVideos = new History({
        _id: userID,
        videos: [{ _id: videoID }],
      });

      await newHistoryVideos.save();

      res.json({
        success: true,
        message:
          "Successfully created new history document and added video to it",
        newHistoryVideos,
      });
    } else {
      const newHistoryVideo = { _id: videoID };

      user.videos.push(newHistoryVideo);
      await user.save();

      res.json({
        success: true,
        message: "Successfully added video to history videos",
        user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to add video to history videos",
      errorMessage: error.message,
    });
  }
};

const removeVideoFromHistoryVideos = async (req, res) => {
  try {
    const { userID } = req.user;
    const user = await History.findById(userID);
    const { videoID } = req.params;

    user.videos.remove(videoID);
    await user.save();

    res.json({
      success: true,
      message: "Successfully removed video from history videos",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to remove video from history videos",
      errorMessage: error.message,
    });
  }
};

const clearHistory = async (req, res) => {
  try {
    const { userID } = req.user;
    const history = await History.findById(userID);

    await history.updateOne({ $set: { videos: [] } });
    await history.save();

    res.json({
      success: true,
      message: "Successfully cleared history",
      history,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to clear history",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getHistoryVideos,
  addVideoToHistoryVideos,
  clearHistory,
  removeVideoFromHistoryVideos,
};
