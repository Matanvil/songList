import React, { useState } from "react";

const CsvUploadForm = ({ onUpload, closeModal }) => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const handleUpload = async () => {
    if (csvFile) {
      try {
        const formData = new FormData();
        formData.append("file", csvFile);

        const response = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // If upload is successful, call the onUpload callback
          onUpload();
          closeModal();
        } else {
          console.error("Failed to upload CSV file");
        }
      } catch (error) {
        console.error("Error uploading CSV file:", error);
      }
    }
  };

  return (
    <div className="csv-upload-form">
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default CsvUploadForm;
