import React, { useState } from "react";
import "./SongListItems.css";

const SongListItems = ({ songs, fetchSongs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (index) => {
    setActiveIndex(index);
    setMenuOpen(!menuOpen);
  };

  const handleFavorite = async (song) => {
    try {
      await fetch(`http://localhost:4000/api/songs/${song.id}/favorite`, {
        method: "PUT",
      });
      fetchSongs();
    } catch (error) {
      console.error("Error marking song as favorite:", error);
    }
  };

  const handleDelete = async (song) => {
    try {
      await fetch(`http://localhost:4000/api/songs/${song.id}`, {
        method: "DELETE",
      });
      fetchSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <ul className="song-list">
      {songs.map((song, index) => (
        <li className="song-item" key={song.id}>
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
          <div className="song-year">Year: {song.year}</div>
          <div className="heart-icon" onClick={() => handleFavorite(song)}>
            {song.favorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FF0000"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#000000"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM7.5 5C5.57 5 4 6.57 4 8.5c0 3.61 3.4 6.55 8 10.64 4.6-4.09 8-7.03 8-10.64 0-1.93-1.57-3.5-3.5-3.5-1.54 0-2.89.99-3.37 2.36l-1.07 2.87-1.08-2.88C10.39 5.99 9.04 5 7.5 5z"
                />
              </svg>
            )}
          </div>
          <div className="hamburger-menu" onClick={() => toggleMenu(index)}>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </div>
          {activeIndex === index && (
            <div className={`menu-options ${menuOpen ? "active" : ""}`}>
              <button
                className="delete-button"
                onClick={() => handleDelete(song)}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SongListItems;
