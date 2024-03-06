const express = require("express");
const app = express();
const uploadRoutes = require("./routes/uploadRoutes");
const searchRoutes = require("./routes/searchRoutes");
const songsRoutes = require("./routes/songsRoutes");
const lastFmRoutes = require("./routes/lastFmRoutes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

// upload routes
app.use("/api", uploadRoutes);

// search routes
app.use("/api", searchRoutes);

app.use("/api", songsRoutes);

app.use("/api", lastFmRoutes);

module.exports = app;
