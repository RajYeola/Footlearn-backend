const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const historySchema = Schema({
  _id: Schema.Types.ObjectId,
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

const History = model("History", historySchema);

module.exports = History;
