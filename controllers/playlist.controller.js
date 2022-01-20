const Playlist = require("../models/playlist.model");
const { v4: uuidv4 } = require("uuid");

const getAllPlaylists = async (req, res) => {
  try {
    const { userID } = req.user;
    const playlists = await Playlist.findById(userID).populate(
      "playlists.videos"
    );

    res.json({ success: true, playlists });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch playlists",
      errorMessage: error.message,
    });
  }
};

const createNewPlaylistAndAddVideoToPlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistName, videoID } = req.body;

    const user = await Playlist.findById(userID);

    if (!user) {
      const playlist = new Playlist({
        _id: userID,
        playlists: [
          {
            _id: uuidv4(),
            playlistName,
            videos: [{ _id: videoID }],
          },
        ],
      });

      await playlist.save();

      const newPlaylist = playlist.playlists[0];

      res.json({
        success: true,
        message: "Successfully created playlist document for the user",
        newPlaylist,
      });
    } else {
      const newPlaylist = {
        _id: uuidv4(),
        playlistName,
        videos: [{ _id: videoID }],
      };
      user.playlists.push(newPlaylist);
      await user.save();

      res.json({
        success: true,
        message: "Successfully created new playlist",
        newPlaylist,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Could not create playlist for user",
      errorMessage: error.message,
    });
  }
};

const getIndividualPlaylist = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const { userID } = req.user;

    const play = await Playlist.findById(userID);

    const playliss = await play.playlists.find(
      ({ _id: id }) => id === playlistID
    );
    res.json({ playliss });
  } catch (error) {
    res.json({ errorMessage: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistID } = req.params;
    const { playlistName } = req.body;

    const user = await Playlist.findById(userID);
    const playlist = await user.playlists.find(
      ({ _id: id }) => id === playlistID
    );

    playlist.playlistName = playlistName;

    await user.save();

    res.json({
      success: true,
      playlist,
      message: "Successfully updated playlist name",
    });
  } catch (error) {
    res.json({
      success: false,
      errorMessage: error.message,
      message: "Failed to update playlist name",
    });
  }
};

const deletePlaylist = async (req, res) => {
  const { userID } = req.user;
  const { playlistID } = req.params;

  const user = await Playlist.findById(userID);
  const playlist = await user.playlists.find(
    ({ _id: id }) => id === playlistID
  );

  await playlist.remove();
  await user.save();

  res.json({ success: true, user, message: "Successfully deleted playlist" });
  try {
  } catch (error) {
    res.json({
      success: false,
      errorMessage: error.message,
      message: "Failed to delete playlist",
    });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistID, videoID } = req.params;

    const user = await Playlist.findById(userID);
    const playlist = await user.playlists.find(
      ({ _id: id }) => id === playlistID
    );
    const { playlistName } = playlist;

    const newVideo = { _id: videoID };
    playlist.videos.push(newVideo);

    await user.save();

    res.json({
      success: true,
      playlist,
      message: `Successfully added video to ${playlistName}`,
    });
  } catch (error) {
    res.json({
      success: false,
      errorMessage: error.message,
      message: "Failed to add video to playlist",
    });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistID, videoID } = req.params;

    const user = await Playlist.findById(userID);
    const playlist = await user.playlists.find(
      ({ _id: id }) => id === playlistID
    );

    playlist.videos.remove(videoID);
    await user.save();

    res.json({
      success: true,
      message: "Successfully removed video from playlist",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to remove video from playlist",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllPlaylists,
  createNewPlaylistAndAddVideoToPlaylist,
  deletePlaylist,
  updatePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getIndividualPlaylist,
};
