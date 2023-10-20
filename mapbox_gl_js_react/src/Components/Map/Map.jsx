import React from 'react';
import "./Map.css"
import useMap from '../../Hooks/useMap';

export default function Map() {
  const {lng, lat, zoom, mapContainer} = useMap()

  return (
    <div>
      <div className="info-line">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

