const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

// GET /api/search - Search for songs
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const songs = await songsController.searchSongs(query);
    res.json(songs);
  } catch (error) {
    console.error("Error searching songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
