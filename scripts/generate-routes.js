// scripts/generate-routes.js  (Node 18+; run before prerender.js)
const path = require("path");
const fs = require("fs");
const API = process.env.REACT_APP_API_URL;
const get = async (p) => (await fetch(`${API}${p}`)).json();

(async () => {
  const base = require("./prerender-routes.json");
  // const [itineraries] = await Promise.all([get("/itineraries")]); // TODO: real endpoints/shape
  const routes = [
    ...base,
    // ...itineraries.map((i) => `/itinerary-activities/${i.id}`),
    // ...activities.map((a) => `/activity-details/${a.id}`),
  ];
  fs.writeFileSync(path.join(__dirname, "prerender-routes.generated.json"), JSON.stringify([...new Set(routes)], null, 2));
})();