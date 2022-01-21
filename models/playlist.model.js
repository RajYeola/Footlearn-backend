const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playlistSchema = Schema({
  _id: Schema.Types.ObjectId,
  playlists: [
    {
      _id: String,
      playlistName: { type: String },
      videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    },
  ],
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
