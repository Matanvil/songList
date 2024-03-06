const extractEssensialData = (data) => {
  const tracks = data.tracks.track;
  const extractedTracks = tracks.map((track) => {
    return {
      artist: track.artist.name,
      title: track.name,
      images: track.image.map((image) => image["#text"]),
    };
  });
  return extractedTracks;
};

module.exports = { extractEssensialData };
