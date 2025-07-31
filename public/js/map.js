// const map = L.map("map").setView([coordinates[1], coordinates[0]], 13);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// }).addTo(map);

// L.marker([coordinates[1], coordinates[0]])
//   .addTo(map)
//   .openPopup();



fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${listing.location}`, {
  headers: {
    "User-Agent": "YourAppName/1.0 (your@email.com)"  // Required by Nominatim API
  }
})
  .then(response => response.json())
  .then(data => {
    const coordinates = [data[0].lon, data[0].lat];
    const map = L.map("map").setView([coordinates[1], coordinates[0]], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([coordinates[1], coordinates[0]]).addTo(map).openPopup();
  })
  .catch(err => {
    console.error("Error fetching coordinates:", err);
  });
