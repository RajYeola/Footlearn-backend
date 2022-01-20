const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = Schema({
  id: {
    type: String,
    required: [true, "Video id is a required field"],
    unique: true,
  },
  name: { type: String, required: [true, "Name is a required field"] },
  url: { type: String, required: [true, "Name is a required field"] },
  views: { type: String, required: [true, "Views is a required field"] },
  channel: { type: String, required: [true, "Channel is a required field"] },
  subscribers: {
    type: String,
    required: [true, "subscribers is a required field"],
  },
  channelThumbnail: {
    type: String,
    required: [true, "Channel thumbnail is a required field"],
  },
  videoThumbnail: {
    type: String,
    required: [true, "Video Thumbnail is a required field"],
  },
  videoDescription: {
    type: String,
    required: [true, "Video Description is a required field"],
  },
  time: { type: String, required: [true, "Time is a required field"] },
  genre: { type: String, required: [true, "Genre is a required field"] },
});

const Video = model("Video", videoSchema);

module.exports = Video;
