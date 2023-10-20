import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useRoutes from '../../Hooks/useRoutes';
import { useMarkers } from '../../Hooks/useMarkers';
import useMapContext, { MapContext } from '../../Context/useMapContext';
import "./Map.css"
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // Initial coordinates of Veszprém
  const [lng, setLng] = useState(17.9156);
  const [lat, setLat] = useState(47.0934);
  const [zoom, setZoom] = useState(12);
  const { mapProvider} = useMapContext(); 
  useRoutes();
  const {  createMarker } = useMarkers();

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
    mapProvider(map.current);

    return () => {
      map.current.off('click', handleMapClick);
    };
  }, []);

  const handleMapClick = useCallback((e) => {
    const clickedLngLat = [e.lngLat.lng, e.lngLat.lat];
    createMarker(map.current, clickedLngLat);
  }, []);

  return (
    <div>
      <div className="info-line">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

