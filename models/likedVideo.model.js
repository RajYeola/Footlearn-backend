const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likedVideoSchema = Schema({
  _id: Schema.Types.ObjectId,
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

const LikedVideo = model("likedVideo", likedVideoSchema);

module.exports = LikedVideo;
