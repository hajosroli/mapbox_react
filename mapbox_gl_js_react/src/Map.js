import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(17.9156);
    const [lat, setLat] = useState(47.0934);
    const [zoom, setZoom] = useState(12);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
          });
        });

        const handleAddMarker = (lng, lat) => {
          const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          setMarkers([...markers, marker]);
        };

        return (
            <div>
              <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
              </div>
              <div ref={mapContainer} className="map-container" />
            </div>
          );
}