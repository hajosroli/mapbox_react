import mapboxgl from 'mapbox-gl';
import useMapContext from '../Context/useMapContext';
import { useEffect} from 'react';

export function useMarkers() {
    const {
      setMarkersObj,
      markersObj,
      markerLimit,
      setIsMarkerLimitReached} = useMapContext();
    
    const createMarker = (map, lngLat) => {
      const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      const markerObj = {
        id: Date.now(),
        lng: marker.getLngLat().lng.toFixed(4),
        lat: marker.getLngLat().lat.toFixed(4),
        marker: marker
      };
      marker.getElement().addEventListener('mousedown', () =>
        handleRemoveOnMarkerClick(marker, markerObj.id)
      );
      setMarkersObj((prevMarkers) => [...prevMarkers, markerObj]);
      return markerObj;
    }
  
    const handleRemoveOnMarkerClick = (marker, markerId) => {
      marker.remove();
      setMarkersObj((prevMarkers) => prevMarkers.filter((m) => m.id !== markerId));
    };

    const removeAllMarkers = () => { 
      if (!markersObj.length > 0) return;
      for (let i = 0; i < markersObj.length; i++) {
        let marker = markersObj[i].marker;
        if (marker) marker.remove();}
        setMarkersObj([]);
    }
  
    const checkMarkerLimit = () => {
      if (markersObj.length >= markerLimit) {
        setIsMarkerLimitReached(true);
      } else {
        setIsMarkerLimitReached(false);
      }
    };
    
    useEffect(() => {
      // Ensure the initial state of isMarkerLimitReached is correct
      checkMarkerLimit();
    }, [markersObj]);

    return { createMarker, removeAllMarkers };
  }