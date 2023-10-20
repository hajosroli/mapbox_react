import mapboxgl from 'mapbox-gl';
import useMapContext from '../Context/useMapContext';
export function useMarkers() {
    const {setMarkersObj} = useMapContext();

    const createMarker = (map, lngLat) => {
      const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      const markerObj = {
        id: Date.now(),
        lng: marker.getLngLat().lng.toFixed(4),
        lat: marker.getLngLat().lat.toFixed(4),
      };
      console.log("click2")
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
  
    return { createMarker };
  }