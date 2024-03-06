import React, { useEffect, useState } from "react";
import "./MostListenedSongs.css";

const MostListenedSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchMostListenedSongs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/toptracks");
        if (!response.ok) {
          throw new Error("Failed to fetch most listened songs");
        }
        const data = await response.json();
        // only use the top 10 tracks
        let topTen = [];
        if (data.length > 10) {
          for (let i = 0; i < 10; i++) {
            topTen.push(data[i]);
          }
          setSongs(topTen);
        }
      } catch (error) {
        console.error("Error fetching most listened songs:", error);
      }
    };

    fetchMostListenedSongs();
  }, []);

  return (
    <div className="most-listened-container-main">
      <h2>Last.fm Most Listened Songs Chart</h2>
      <ul className="most-listened-list">
        {songs.map((song, index) => (
          <li key={index} className="most-listened-item">
            <div className="song-details">
              <h4 className="song-title">
                {index + 1}: {song.title}
              </h4>
              <p className="song-artist">By: {song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostListenedSongs;
