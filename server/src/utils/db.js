const { Pool } = require("pg");

const pool = new Pool({
  user: "postgress",
  host: "localhost",
  database: "song_list_db",
  password: "matanv1405",
  port: 5433,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

// Check if the 'songs' table exists
const checkSongsTable = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT to_regclass('public.songs')`);
    const tableExists = result.rows[0].to_regclass !== null;
    return tableExists;
  } finally {
    client.release();
  }
};

// Create the 'songs' table if it doesn't exist
const createSongsTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        year INTEGER,
        favorite BOOLEAN DEFAULT false
      )
    `);
    console.log("Created songs table");
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  checkSongsTable,
  createSongsTable,
};
