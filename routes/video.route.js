const express = require("express");
const router = express.Router();

const { getVideos, addVideo } = require("../controllers/video.controller");

router.get("/", getVideos);
router.post("/", addVideo);

module.exports = router;
