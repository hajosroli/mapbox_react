import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useRoutes from './Hooks/useRoutes';

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  //Initial coordinates of Veszprém
  const [lng, setLng] = useState(17.9156);
  const [lat, setLat] = useState(47.0934);
  const [zoom, setZoom] = useState(12);
  const [markersObj, setMarkersObj] = useState([]);
  const {routeInfo, routeCoord} = useRoutes({markersObj, map: map.current})
  let markerIdCounter = 0; //for adding id to marker objects
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
    setMarkersObj((prevMarkers) => [...prevMarkers, marker]);
  }, []);

  const createMarker = (lngLat) => {
    const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);
    const markerObj = {
      id :  markerIdCounter++,
      lng : marker.getLngLat().lng.toFixed(4),
      lat : marker.getLngLat().lat.toFixed(4),
    }
    marker.getElement().addEventListener('mousedown', () => handleRemoveOnMarkerClick(marker, markerObj.id));
    return markerObj;
  };

  const handleRemoveOnMarkerClick = (marker, markerId) => {
    marker.remove();
    setMarkersObj((prevMarkers) => prevMarkers.filter((m) => m.id !== markerId));//!!!!
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

