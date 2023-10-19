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

const addMarkerToMap = (map, id, coordinates, color) => {
  const marker = {
    id: id,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coordinates,
            },
          },
        ],
      },
    },
    paint: {
      'circle-radius': 10,
      'circle-color': color,
    },
  };
  map.addLayer(marker);
};

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
        const coordinates = getCoordinates(markersObj);
        const routeCoordinates = await fetchRoute(coordinates);
        addRouteToMap(map, routeCoordinates.geometry.coordinates);
        setRouteInfo(calculateRouteInfo(routeCoordinates.legs))
        setRouteCoord(routeCoordinates);
      };

      updateRoute();

      /*map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be',
        },
      });*/

      for (let i = 1; i < markersObj.length; i++) {
        const waypointCoords = [markersObj[i].lng, markersObj[i].lat];
        map.on('click', (event) => {
          const waypointId = `waypoint-${i}`;
          //addMarkerToMap(map, waypointId, waypointCoords, '#f30');
          updateRoute();
        });
      }
    }
  }, [markersObj, map]);

  return { routeInfo, routeCoord };
}
