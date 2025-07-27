const fetch = require("node-fetch");

module.exports.getCoordinates = async (location) => {
  const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;
  const response = await fetch(geoUrl);
  const data = await response.json();

  if (!data || data.length == 0) {
    return null
  }
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  }
 
};
