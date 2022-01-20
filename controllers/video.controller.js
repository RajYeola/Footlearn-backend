const Video = require("../models/video.model");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});

    res.json({ success: true, videos });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to get videos",
      errorMessage: error.message,
    });
  }
};

const addVideo = async (req, res) => {
  try {
    const video = req.body;
    const newVideo = await new Video(video);
    const savedVideo = await newVideo.save();

    res.json({ success: true, savedVideo });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to add new video",
      errorMessage: error.message,
    });
  }
};

module.exports = { addVideo, getVideos };
