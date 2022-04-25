import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vh",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewPortChange={setViewport}
    />
  );
};

export default App;
