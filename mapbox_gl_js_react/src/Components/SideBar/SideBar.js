import useMapContext from "../../Context/useMapContext"
import "./SideBar.css";
import mapboxgl from 'mapbox-gl'; 
import React, { useRef, useEffect, useState, useCallback } from 'react';
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
export default function SideBar() {
    const { map, setMarkersObj, routeInfo } = useMapContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = async () => {
      try {
        // Perform a location search using Mapbox Geocoding
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?proximity=ip&access_token=pk.eyJ1IjoiaGFqb3Nyb2xpIiwiYSI6ImNsbnZpd2NreDBwdzAycG5wejZ4Y2N4NTcifQ.hmhue7vQyPr2SIJpLN8I1g`
        );
        const data = await response.json();
        console.log(data)
  
        // Extract the first result's coordinates
        if (data.features && data.features.length > 0) {
          const { center, place_name } = data.features[0];
          const [lng, lat] = center;
  
          const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

          // Create a marker for the found location
          const markerObj = {
            id: Date.now(), // You can use a timestamp as an ID
            lng : marker.getLngLat().lng.toFixed(4),
            lat : marker.getLngLat().lat.toFixed(4)
          };
  
          // Set the map center to the found location
          map.flyTo({ center: [lng, lat], zoom: 12 });
  
          // Update the search results and markers
          setSearchResults([place_name]);
          setMarkersObj((prevMarkers) => [...prevMarkers, markerObj]);
          setSearchQuery('');
          //setRouteInfo({ distance: null, duration: null }); // Clear route info
        } else {
          setSearchResults(['No results found']);
        }
      } catch (error) {
        console.error('Error searching for location:', error);
      }
    };
    const formattedDuration = routeInfo.duration ? `${routeInfo.duration} mins` : 'N/A';
  const formattedDistance = routeInfo.distance ? `${routeInfo.distance} km` : 'N/A';
    return (
      <div className="sidebar-container">
        <h1>Route Information</h1>
        
        <div className="info-item">
        <strong>Duration:</strong> {formattedDuration}
      </div>
      <div className="info-item">
        <strong>Distance:</strong> {formattedDistance}
      </div>
        <div className="location-search">
          <input
            type="text"
            placeholder="Find a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </div>
      </div>
    );
  }