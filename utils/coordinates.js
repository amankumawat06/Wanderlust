// const fetch = require("node-fetch");

// module.exports.getCoordinates = async (location) => {
//   try{
//   const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//     location
//   )}`;
//   const response = await fetch(geoUrl);
//   const data = await response.json();

//   if (!data || data.length == 0) {
//     return null
//   }
//   return {
//     lat: parseFloat(data[0].lat),
//     lon: parseFloat(data[0].lon),
//   }
// }catch{
  
// }
// };

const fetch = require("node-fetch");

module.exports.getCoordinates = async (location) => {
  try {
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;

    const response = await fetch(geoUrl, {
      headers: {
        "User-Agent": "WanderlustApp/1.0 (contact@wanderlust.com)",
        "Accept": "application/json",
      },
      timeout: 8000,
    });

    const text = await response.text();

    if (!response.ok || text.startsWith("<")) {
      console.error("Geocoding blocked or failed");
      return null;
    }

    const data = JSON.parse(text);

    if (!data || data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("getCoordinates error:", err);
    return null;
  }
};
