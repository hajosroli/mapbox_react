import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Button} from "react-bootstrap";
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(17.9156);
  const [lat, setLat] = useState(47.0934);
  const [zoom, setZoom] = useState(12);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (e) => {
      const clickedLngLat = [e.lngLat.lng, e.lngLat.lat];
      const marker = new mapboxgl.Marker().setLngLat(clickedLngLat).addTo(map.current);

      marker.getElement().addEventListener('mousedown', () => handleRemoveOnMarkerClick(marker));// to remove marker on clickin the icon

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });
  }, [lng, lat, zoom]);

  const handleRemoveOnMarkerClick = (marker) => {
    marker.remove();
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
  };

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <div className="markers-container">
        <h2>Markers</h2>
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>
              Marker {index + 1}: {marker.getLngLat().lng.toFixed(4)}, {marker.getLngLat().lat.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;