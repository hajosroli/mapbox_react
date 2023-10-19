import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Button} from "react-bootstrap";
import useRoutes from './Hooks/useRoutes';
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;


export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(17.9156);
  const [lat, setLat] = useState(47.0934);
  const [zoom, setZoom] = useState(12);
  const [markers, setMarkers] = useState([]);
  const [markersObj, setMarkersObj] = useState([]);
  const {routeInfo, routeCoord} = useRoutes({markersObj, map: map.current})
  console.log(routeInfo)
  console.log(routeCoord)

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

    map.current.on('click', handleMapClick);

    return () => {
      map.current.off('click', handleMapClick);
    };
  }, [lng, lat, zoom]);

  const handleMapClick = useCallback((e) => {
    const clickedLngLat = [e.lngLat.lng, e.lngLat.lat];
    const marker = createMarker(clickedLngLat);
    const markerObj = {
      id : marker.length,
      lng : marker.getLngLat().lng.toFixed(4),
      lat : marker.getLngLat().lat.toFixed(4),
    }
    setMarkersObj((prevMarkers) => [...prevMarkers, markerObj]);
  }, []);

  const createMarker = (lngLat) => {
    const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);
    marker.getElement().addEventListener('mousedown', () => handleRemoveOnMarkerClick(marker));
    return marker;
  };

  const handleRemoveOnMarkerClick = (marker) => {
    marker.remove();
    setMarkersObj((prevMarkers) => prevMarkers.filter((m) => m.lng !== marker.getLngLat().lng.toFixed(4) && m.lat !== marker.getLngLat().lat.toFixed(4)));
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
          {markersObj.map((marker, index) => (
            <li key={index}>
              Marker {marker.id}: {marker.lng}, {marker.lat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

