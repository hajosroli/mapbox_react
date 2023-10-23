import { useEffect} from 'react';
import useMapContext from '../Context/useMapContext';
import { fetchRoute } from '../FetchUtils/fetchUtils';
import useRouteContext from '../Context/useRouteContext';

// Get the coordinates of markers
const getCoordinates = (markers) => markers.map((marker) => `${marker.lng},${marker.lat}`).join(";");

const addRouteToMap = (map, coordinates,routeLayerId, color, lineWidth) => {
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

// Remove routes for using if ther is less than two markers
const removeRoutes = (map, routeLayerId) => {
  if (map && map.getStyle) {
    // Remove any potential layers that start with 'route'
    map.getStyle().layers.forEach(function (layer) {
      if (layer.id.startsWith(routeLayerId)) {
        map.removeLayer(layer.id);
      }
    });
    // Remove any potential sources that start with 'route'
    Object.keys(map.getStyle().sources).forEach(function (sourceId) {
      if (sourceId.startsWith(routeLayerId)) {
        map.removeSource(sourceId);
      }
    });
  }
};

// Calculate route distance and duration
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
  const {markersObj, map, setErrorMessage, setShowAlert
    } = useMapContext();

  const {routeCoord, setRouteCoord, routeInfo, setRouteInfo,color,lineWidth,routeMode
    } = useRouteContext();
  const routeLayerId = 'route';

  // Get route between markers if there is any
  const getRoute = async (coordinates) => {
    const routeCoordinates = await fetchRoute(routeMode,coordinates);
    if(routeCoordinates){
      addRouteToMap(map, routeCoordinates.geometry.coordinates,routeLayerId, color, lineWidth);
      return routeCoordinates;
    }else{
      setErrorMessage('No route is available!');
      setShowAlert(true);
      return null;
    }
  }
 
  useEffect(() => {
    if (markersObj.length >= 2) {
      const updateRoute = async () => {
        const coordinates = getCoordinates(markersObj);
        const routeCoordinates = await getRoute(coordinates)
        if(routeCoordinates){
          changeColorOfExistingRoute(map, routeLayerId, color, lineWidth)
          setRouteInfo(calculateRouteInfo(routeCoordinates.legs))
          setRouteCoord(routeCoordinates);
        }
      };
      updateRoute();
    }else if(markersObj.length < 2){
      removeRoutes(map, routeLayerId)
      setRouteInfo({
        distance: null,
        duration: null,
      });
    }
  }, [markersObj, color, lineWidth, routeMode]);
  
  return { routeInfo, routeCoord };
}
