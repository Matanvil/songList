import React, { useState } from "react";
import "./SongListControls.css";
import AddSongModal from "./AddSongModal";

const SongListControls = ({ onSearchSubmit, fetchSongs, onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("artist");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchQuery);
  };

  const onUpload = () => {
    fetchSongs();
    closeModal();
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className="song-list-controls">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="button-container">
        <select
          className="filter-select"
          onChange={handleFilterChange}
          value={filterOption}
        >
          <option value="artist">Sort by Artist</option>
          <option value="year">Sort by Year</option>
          <option value="title">Sort by Title</option>
          <option value="favorite">Sort by Favorite</option>
        </select>
        <button onClick={openModal} className="add-song-button">
          Add Your Own Taste Of Music?
        </button>
        {isModalOpen && (
          <AddSongModal
            closeModal={closeModal}
            onUpload={onUpload}
            fetchSongs={fetchSongs}
          />
        )}
      </div>
    </div>
  );
};

export default SongListControls;
