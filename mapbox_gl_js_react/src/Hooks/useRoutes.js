import { useEffect} from 'react';
import useMapContext from '../Context/useMapContext';
import { fetchRoute } from '../FetchUtils/fetchUtils';

const getCoordinates = (markers) => markers.map((marker) => `${marker.lng},${marker.lat}`).join(";");

const addRouteToMap = (map, coordinates,routeLayerId, color, lineWidth) => {
  console.log(color)
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
  };
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  } else {
    map.addLayer({
      id: routeLayerId,
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': color,
        'line-width':  Number(lineWidth),
        'line-opacity': 0.75,
      },
    });
  }
};
const changeColorOfExistingRoute = (map, routeLayerId, color, lineWidth) =>{
  if (map.getLayer(routeLayerId)) {
    // Update the line color
    map.setPaintProperty(routeLayerId, 'line-color', color);
    
    // Update the line width
    map.setPaintProperty(routeLayerId, 'line-width', Number(lineWidth));
  } else {
    console.error('Route layer not found on the map.');
  }
}

const removeRouteIfOnlyOneMarker = (markers, map, routeLayerId) => {
    // Remove the route from the map if it exists
    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
    }
    if (map.getSource('route')) {
      map.removeSource('route');
    }
};

const calculateRouteInfo = (routeData) => {
    let routeDistance = 0;
    let routeDuration = 0;
    for(let leg of routeData){
        routeDistance += leg.distance;
        routeDuration += leg.duration;
    }
    return {distance: Math.round(routeDistance / 1000), // metres to km
    duration: Math.round(routeDuration / 60) }//seconds to minutes}
}

export default function useRoutes() {
  const {
    routeCoord, 
    setRouteCoord, 
    routeInfo, 
    setRouteInfo,
    markersObj,
    map,
    color,
    lineWidth
  } = useMapContext();
  const routeLayerId = 'route';

  useEffect(() => {
    if (markersObj.length >= 2) {
      
      const updateRoute = async () => {
        const coordinates = getCoordinates(markersObj);
        const routeCoordinates = await fetchRoute(coordinates);
        addRouteToMap(map, routeCoordinates.geometry.coordinates,routeLayerId, color, lineWidth);
        changeColorOfExistingRoute(map, routeLayerId, color, lineWidth)
        
        setRouteInfo(calculateRouteInfo(routeCoordinates.legs))
        setRouteCoord(routeCoordinates);
      };
      updateRoute();
    }else if(markersObj.length < 2 && markersObj.length > 0){
      removeRouteIfOnlyOneMarker(markersObj, map, routeLayerId);
    }
  }, [markersObj, color, lineWidth]);
  

  return { routeInfo, routeCoord };
}
