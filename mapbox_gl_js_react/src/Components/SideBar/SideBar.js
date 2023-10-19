import useMapContext from "../../Context/useMapContext"
import { useMarkers } from "../../Hooks/useMarkers"; 
import "./SideBar.css";
import React, { useEffect, useState} from 'react';


const fetchLocations = async (markers) => {
    let locations = [];
    for(let i =0; i < markers.length; i++){

        try {
            // Perform a location search using Mapbox Geocoding
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${markers[i].lng}, ${markers[i].lat}.json?proximity=ip&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
            );
            const data = await response.json();
            console.log(data)
            locations.push(data.features[0].place_name);
    }catch (error) {
        console.error('Error searching for location:', error);
      }
}

return locations;
}
export default function SideBar() {
    const { map,routeInfo, markersObj } = useMapContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { createMarker } = useMarkers(); 
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const getLocations = async () => {
            if (!map || !markersObj){ return };
            const newData = await fetchLocations(markersObj);
            setLocations(newData)
        }
        getLocations()
    }, [markersObj])
    
    const handleSearch = async () => {
      try {
        // Perform a location search using Mapbox Geocoding
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?proximity=ip&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        );
        const data = await response.json();
        console.log(data)
  
        // Extract the first result's coordinates
        if (data.features && data.features.length > 0) {
          const { center, place_name } = data.features[0];
          const [lng, lat] = center;
  
          createMarker(map,[lng, lat] )
          // Set the map center to the found location
          map.flyTo({ center: [lng, lat], zoom: 12 });
          // Update the search results and markers
          setSearchResults([place_name]);
          setSearchQuery('');
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
        <h1>Find Location</h1>
        <div className="location-search">
          <input
            type="text"
            placeholder="Find a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <h1>Route Information</h1>
  <table>
    <tbody>
      <tr className="info-item">
        <td><strong>Duration:</strong></td>
        <td>{formattedDuration}</td>
      </tr>
      <tr className="info-item">
        <td><strong>Distance:</strong></td>
        <td>{formattedDistance}</td>
      </tr>
    </tbody>
  </table>
  <div className="search-results">
    {locations ? locations.map((result, index) => (
      <div key={index}>
        <span>
          {index === 0 && <strong>From: </strong>} {/* Első elem előtt: "From: " */}
          {index > 0 && index < locations.length - 1 && <strong>Via: </strong>} {/* Köztes elemek előtt: "Via: " */}
          {index === locations.length - 1 && <strong>To: </strong>} {/* Utolsó elem előtt: "To: " */}
        </span>
        <span>{result}</span>
      </div>
    )) : null}
  </div>
      </div>
    );
  }