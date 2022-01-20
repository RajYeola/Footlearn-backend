const express = require("express");
const router = express.Router();
const {
  getHistoryVideos,
  addVideoToHistoryVideos,
  clearHistory,
  removeVideoFromHistoryVideos,
} = require("../controllers/history.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

router.get("/", verifyAuth, getHistoryVideos);
router.post("/", verifyAuth, addVideoToHistoryVideos);
router.delete("/", verifyAuth, clearHistory);
router.delete("/:videoID", verifyAuth, removeVideoFromHistoryVideos);

module.exports = router;
