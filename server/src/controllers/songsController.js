const { pool } = require("../utils/db");
const format = require("pg-format");

async function insertSong(songData) {
  const query = "INSERT INTO songs (title, artist, year) VALUES ($1, $2, $3)";
  const values = [songData.title, songData.artist, songData.year];

  try {
    const result = await pool.query(query, values);
    console.log("Song inserted successfully:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting song:", error);
    throw error;
  }
}

async function insertSongs(songsData) {
  try {
    // Map over songsData to split the single string value and extract the song title, artist, and year
    const values = songsData.map((song) => {
      console.log(JSON.stringify(song));
      const { "Song Name;Band;Year": songInfo } = song;
      console.log(JSON.stringify(songInfo));
      const [title, artist, year] = songInfo.split(";");
      return [title, artist, parseInt(year)]; // Convert year to integer
    });
    console.log(JSON.stringify(values));

    const query = format(
      "INSERT INTO songs (title, artist, year) VALUES %L",
      values,
    );

    await pool.query(query);
    console.log("Songs inserted successfully.");
  } catch (error) {
    console.error("Error inserting songs:", error);
    throw error;
  }
}

async function deleteSong(id) {
  const query = "DELETE FROM songs WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    console.log(`Song with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
}

async function getSongsByYear(year) {
  let query = "SELECT * FROM songs";
  const values = [];

  if (year) {
    query += " WHERE year = $1";
    values.push(year);
  }

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error getting songs by year:", error);
    throw error;
  }
}

async function getSongsAfterYear(year) {
  let query = "SELECT * FROM songs";
  const values = [];

  if (year) {
    query += " WHERE year >= $1";
    values.push(year);
  }

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error getting songs after year:", error);
    throw error;
  }
}

async function searchSongs(query) {
  let searchCondition = "";
  const searchKeyword = `%${query}%`;

  searchCondition += ` (title ILIKE $1 OR artist ILIKE $1)`;

  const queryString = `SELECT * FROM songs WHERE ${searchCondition}`;

  try {
    const result = await pool.query(queryString, [searchKeyword]);
    return result.rows;
  } catch (error) {
    console.error("Error searching songs:", error);
    throw error;
  }
}

async function deleteAllSongs() {
  const query = "DELETE FROM songs";

  try {
    await pool.query(query);
    console.log("All songs deleted successfully.");
  } catch (error) {
    console.error("Error deleting all songs:", error);
    throw error;
  }
}

async function toggleSongFavorite(songId) {
  try {
    const query = `
      UPDATE songs
      SET favorite = NOT favorite -- Toggle the value
      WHERE id = $1
    `;
    await pool.query(query, [songId]);
  } catch (error) {
    console.error("Error toggling song favorite:", error);
    throw error;
  }
}

module.exports = {
  insertSong,
  getSongsByYear,
  deleteSong,
  insertSongs,
  searchSongs,
  getSongsAfterYear,
  deleteAllSongs,
  toggleSongFavorite,
};
