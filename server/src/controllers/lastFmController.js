const axios = require("axios");
const { extractEssensialData } = require("../utils/parseLastFm");

const LAST_FM_API_KEY = "da2dcafac3a18ddfe31d26ba5801d57d";

// Function to fetch top tracks from Last.fm
async function fetchTopTracks() {
  try {
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "chart.gettoptracks",
        api_key: LAST_FM_API_KEY,
        format: "json",
      },
    });
    if (response && response.data) {
      return extractEssensialData(response.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching top tracks from Last.fm:", error);
    throw error;
  }
}

module.exports = {
  fetchTopTracks,
};
