import React, { useState, useEffect } from "react";
import SongListControls from "./SongListControls";
import SongListItems from "./SongListItems";

const SongList = () => {
  let [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterView, setFilterView] = useState("artist");

  const fetchSongs = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/songs");
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSearchSubmit = async (searchQuery) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/search?query=${searchQuery}`,
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  useEffect(() => {
    setSearchResults(songs);
  }, [songs]);

  const handleFilterChange = (filterValue) => {
    if (!songs.length) {
      return;
    }
    switch (filterValue) {
      case "year":
        // Sort items by year
        songs.sort((a, b) => a.year - b.year);
        setFilterView(filterValue);
        break;
      case "artist":
        // Sort items by artist name
        songs.sort((a, b) => a.artist.localeCompare(b.artist));
        setFilterView(filterValue);
        break;
      case "title":
        // Sort items by title
        songs.sort((a, b) => a.title.localeCompare(b.title));
        setFilterView(filterValue);
        break;
      case "favorite":
        songs.sort((a, b) => b.favorite - a.favorite);
        setFilterView(filterValue);
        break;
      default:
        return songs;
    }
  };

  useEffect(() => {
    handleFilterChange(filterView);
  }, [songs]);

  return (
    <div className="song-list-container">
      <SongListControls
        onSearchSubmit={handleSearchSubmit}
        fetchSongs={fetchSongs}
        onFilterChange={handleFilterChange}
      />
      <SongListItems
        songs={searchResults.length > 0 ? searchResults : songs}
        fetchSongs={fetchSongs}
      />
    </div>
  );
};

export default SongList;
