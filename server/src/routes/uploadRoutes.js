const express = require("express");
const router = express.Router();
const multer = require("multer");
const { parseCSV } = require("../utils/csvParser");
const songsController = require("../controllers/songsController");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload - Upload a new CSV file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Pass the file buffer to the parseCSV function
    const parsedData = await parseCSV(req.file.buffer);

    // Insert parsed data into the database
    await songsController.insertSongs(parsedData);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
