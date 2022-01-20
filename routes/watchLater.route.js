const express = require("express");
const {
  getWatchLaterVideos,
  addVideoToWatchLaterVideos,
  removeVideoFromWatchLaterVideos,
} = require("../controllers/watchLater.controller");
const { verifyAuth } = require("../middleware/verifyAuth");
const router = express.Router();

router.get("/", verifyAuth, getWatchLaterVideos);
router.post("/", verifyAuth, addVideoToWatchLaterVideos);
router.delete("/:videoID", verifyAuth, removeVideoFromWatchLaterVideos);

module.exports = router;
