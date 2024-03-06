// const fs = require("fs");
const csvParser = require("csv-parser");

function parseCSV(buffer) {
  return new Promise((resolve, reject) => {
    const transformedData = [];

    // Convert the buffer to a readable stream
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    bufferStream
      .pipe(csvParser())
      .on("data", (row) => {
        const transformedRow = {};
        for (let key in row) {
          transformedRow[key] = row[key].toLowerCase();
        }
        transformedData.push(transformedRow);
      })
      .on("end", () => {
        resolve(transformedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = {
  parseCSV,
};
