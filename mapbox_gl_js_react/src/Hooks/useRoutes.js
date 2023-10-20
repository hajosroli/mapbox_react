import { useEffect, useState } from 'react';
import useMapContext from '../Context/useMapContext';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const DIRECTIONS_API = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
const DIRECTIONS_PARAMS = `?geometries=geojson&access_token=${ACCESS_TOKEN}`;

const getCoordinates = (markers) => markers.map((marker) => `${marker.lng},${marker.lat}`).join(";");

const fetchRoute = async (coordinates) => {
  try {
    const response = await fetch(`${DIRECTIONS_API}${coordinates}${DIRECTIONS_PARAMS}`, { method: 'GET' });
    const data = await response.json();
    return data.routes[0];
  } catch (error) {
    console.error('Error fetching route:', error);
    return [];
  }
};

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
console.log(color)
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
    }
  }, [markersObj, color, lineWidth]);
  

  return { routeInfo, routeCoord };
}
