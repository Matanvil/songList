// App.js

import React from "react";
import SongListHeader from "./components/SongListHeader";
import SongListControls from "./components/SongListControls";
import SongList from "./components/SongList";
import MostListenedSongs from "./components/MostListenedSongs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SongListHeader />
      <div className="main-container">
        <div className="list-container">
          <SongList />
        </div>
        <div className="most-listened-container">
          <MostListenedSongs />
        </div>
      </div>
    </div>
  );
}

export default App;
