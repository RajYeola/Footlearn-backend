const express = require("express");
const router = express.Router();

const {
  getLikedVideos,
  addVideoToLikedVideos,
  removeVideoFromLikedVideos,
} = require("../controllers/likedVideo.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

router.get("/", verifyAuth, getLikedVideos);
router.post("/", verifyAuth, addVideoToLikedVideos);
router.delete("/:videoID", verifyAuth, removeVideoFromLikedVideos);

module.exports = router;
