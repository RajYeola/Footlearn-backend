const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const watchLaterSchema = Schema({
  _id: Schema.Types.ObjectId,
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

const WatchLater = model("watchLater", watchLaterSchema);

module.exports = WatchLater;
