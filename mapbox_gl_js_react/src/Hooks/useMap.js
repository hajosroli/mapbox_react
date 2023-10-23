import { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useRoutes from '../Hooks/useRoutes';
import { useMarkers } from '../Hooks/useMarkers';
import useMapContext from '../Context/useMapContext';
import { LNG_VESZPREM, LAT_VESZPREM } from '../Constants/constants';
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

// Get the the center of map to the marker if there is only one
// Or to Veszprém if zero
const focusOnMarkerIfOnOrZero = (markers, map) =>{
  if(markers.length === 1){
    let marker = markers[0];
    map.current?.flyTo({center:[marker.lng, marker.lat]})
  }else if(markers.length === 0){
    map.current?.flyTo({center:[LNG_VESZPREM, LAT_VESZPREM]})
  }
}

export default function useMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const isMarkerLimitReachedRef = useRef(false);
  // Initial coordinates of Veszprém
  const [lng, setLng] = useState(LNG_VESZPREM);
  const [lat, setLat] = useState(LAT_VESZPREM);
  const [zoom, setZoom] = useState(12);
  const {createMarker} = useMarkers();
  useRoutes();
  const { 
    mapProvider,
    isMarkerLimitReached, 
    setShowAlert, 
    setErrorMessage, markersObj } = useMapContext();

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

  // Update the ref when the state variable changes
  useEffect(() => {
    isMarkerLimitReachedRef.current = isMarkerLimitReached;
  }, [isMarkerLimitReached]);

  useEffect(() => {
    focusOnMarkerIfOnOrZero(markersObj, map);
  }, [markersObj]);


const handleMapClick = useCallback((e) => {
    const clickedLngLat = [e.lngLat.lng, e.lngLat.lat];
    if (!isMarkerLimitReachedRef.current) {
      createMarker(map.current, clickedLngLat);
    } else {
      setErrorMessage('Maximum Limit of placed Markers is reached!');
      setShowAlert(true);
    }
  }, []);

 
  return {
    lng,
    lat,
    zoom,
    mapContainer,
  };
}