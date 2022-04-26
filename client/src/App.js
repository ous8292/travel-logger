import React, { useState, useEffect } from "react";
// import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { listLogEntries } from "./API";

// const App = () => {
//   const [viewport, setViewport] = useState({
//     width: "100vh",
//     height: "100vh",
//     longitude: -122.4,
//     latitude: 37.8,
//     zoom: 8,
//   });

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//       onViewPortChange={setViewport}
//     />
//   );
// };

import Map from "react-map-gl";

function App() {
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
    })();
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: -95.655,
        latitude: 37.6,
        zoom: 3,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
}

export default App;
