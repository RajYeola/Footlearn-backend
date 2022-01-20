const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/verifyAuth");
const {
  getAllPlaylists,
  createNewPlaylistAndAddVideoToPlaylist,
  deletePlaylist,
  updatePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getIndividualPlaylist,
} = require("../controllers/playlist.controller");

router.get("/", verifyAuth, getAllPlaylists);
router.post("/", verifyAuth, createNewPlaylistAndAddVideoToPlaylist);
router.get("/:playlistID", verifyAuth, getIndividualPlaylist);
router.post("/:playlistID", verifyAuth, updatePlaylist);
router.delete("/:playlistID", verifyAuth, deletePlaylist);
router.post("/:playlistID/:videoID", verifyAuth, addVideoToPlaylist);
router.delete("/:playlistID/:videoID", verifyAuth, removeVideoFromPlaylist);

module.exports = router;
