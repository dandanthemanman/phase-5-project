import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjWrGMXdrPYba-cU93zg_4helHk7bFfY0",
  });

  if (!isLoaded) return <div>Loading ... </div>;

  return (
    <GoogleMap
      zoom={10}
      center={{
        lat: 44,
        lng: -80,
      }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

export default Map;
