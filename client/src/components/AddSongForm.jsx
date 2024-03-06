import React, { useState } from "react";
import "./AddSongModal.css";

const AddSongForm = ({ fetchSongs, closeModal }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          artist: artist,
          year: year,
        }),
      });

      if (response.ok) {
        setTitle("");
        setArtist("");
        setYear("");
        fetchSongs();
        closeModal();
      } else {
        alert("Failed to add song. Please try again.");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-song-form">
      <h2 className="form-title">Add A New Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artist" className="label">
            Artist:
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year" className="label">
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
