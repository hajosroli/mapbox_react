import { useEffect, useState } from 'react';

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

const addRouteToMap = (map, coordinates) => {
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
      id: 'route',
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
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    });
  }
};

const calculateRouteInfo = (routeData) => {
    let routeDistance = 0;
    let routeDuration = 0;
    for(let leg of routeData){
        routeDistance += leg.distance;
        routeDuration += leg.duration;
    }
    return {distance: Math.round(routeDistance),
    duration: Math.round(routeDuration / 60) }//seconds to minutes}
}


export default function useRoutes({ markersObj, map }) {
  const [routeInfo, setRouteInfo] = useState({
    distance: null,
    duration: null,
  });
  const [routeCoord, setRouteCoord] = useState([]);


  useEffect(() => {
    if (markersObj.length >= 2) {
      const start = [markersObj[0].lng, markersObj[0].lat];

      const updateRoute = async () => {
        console.log("itt")
        const coordinates = getCoordinates(markersObj);
        const routeCoordinates = await fetchRoute(coordinates);
        addRouteToMap(map, routeCoordinates.geometry.coordinates);
        setRouteInfo(calculateRouteInfo(routeCoordinates.legs))
        setRouteCoord(routeCoordinates);
      };

      updateRoute();

    }
  }, [markersObj]);// try without map

  return { routeInfo, routeCoord };
}
