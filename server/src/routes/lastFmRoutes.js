const express = require("express");
const router = express.Router();
const { fetchTopTracks } = require("../controllers/lastFmController");

router.get("/toptracks", async (req, res) => {
  try {
    const topTracks = await fetchTopTracks();
    res.json(topTracks);
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
