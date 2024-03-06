import React, { useState } from "react";
import AddSongForm from "./AddSongForm";
import CsvUploadForm from "./CsvUploadForm";
import "./AddSongModal.css";

const AddSongModal = ({ closeModal, onUpload, fetchSongs }) => {
  const [selectedOption, setSelectedOption] = useState("manual");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Song</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div>
            <input
              type="radio"
              id="manual"
              value="manual"
              checked={selectedOption === "manual"}
              onChange={handleOptionChange}
            />
            <label htmlFor="manual">Manual Entry</label>
          </div>
          <div>
            <input
              type="radio"
              id="csv"
              value="csv"
              checked={selectedOption === "csv"}
              onChange={handleOptionChange}
            />
            <label htmlFor="csv">Upload CSV</label>
          </div>
          {selectedOption === "manual" && (
            <div>
              {
                <AddSongForm
                  fetchSongs={fetchSongs}
                  closeModal={closeModal}
                ></AddSongForm>
              }
            </div>
          )}
          {selectedOption === "csv" && (
            <CsvUploadForm onUpload={onUpload} closeModal={closeModal} />
          )}
        </div>
        <div className="modal-footer">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddSongModal;
