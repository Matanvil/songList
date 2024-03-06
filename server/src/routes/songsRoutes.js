const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

// GET /api/songs?year=YYYY - Get songs from a specific year
router.get("/songs", async (req, res) => {
  const year = req.query.year;
  try {
    const songs = await songsController.getSongsByYear(year);
    res.json(songs);
  } catch (error) {
    console.error("Error getting songs by year:", error);
    res.status(500).json({ message: "Internal server error1" });
  }
});

router.get("/songs/after-year", async (req, res) => {
  const year = req.query.year;
  try {
    // Call the getSongsAfterYear function with the provided year
    const songs = await songsController.getSongsAfterYear(parseInt(year));

    // Send the response with the retrieved songs
    res.json(songs);
  } catch (error) {
    console.error("Error getting songs after year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/songs - Create a new song
router.post("/songs", async (req, res) => {
  try {
    // Convert the title and artist to lowercase
    const lowercaseSong = {
      title: req.body.title.toLowerCase(),
      artist: req.body.artist.toLowerCase(),
      year: req.body.year,
    };

    const newSong = await songsController.insertSong(lowercaseSong);
    res.status(201).json(newSong);
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/songs/:id - Delete a song by ID
router.delete("/songs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await songsController.deleteSong(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/songs - Delete all songs
router.delete("/songs", async (req, res) => {
  try {
    await songsController.deleteAllSongs();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting all songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// PUT /api/songs/:id/favorite - toggle song favorite status
router.put("/songs/:id/favorite", async (req, res) => {
  const songId = req.params.id;
  try {
    await songsController.toggleSongFavorite(songId);
    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error marking song as favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
