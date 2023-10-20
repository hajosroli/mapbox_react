import useMapContext from "../../Context/useMapContext"
import { useMarkers } from "../../Hooks/useMarkers"; 
import LocationFinder from "./LocationFinder";
import RouteInfoProvider from "./RouteInfoProvider";
import RouteStyler from "./RouteStyler";
import SearchResults from "./SearchResults";
import "./SideBar.css";
import React, { useEffect, useState} from 'react';
import { fetchLocations, fetchLocationsName } from "../../FetchUtils/fetchUtils";

export default function SideBar() {
    const {map, markersObj} = useMapContext();
    const [locationNames, setLocationNames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { createMarker } = useMarkers(); 
  
    useEffect(() => {
        const getLocations = async () => {
            if (!map || !markersObj){ return };
            const newData = await fetchLocationsName(markersObj);
            setLocationNames(newData)
        }
        getLocations()
    }, [markersObj])

    const handleSearch = async() => {
        const locations = await fetchLocations(searchQuery);
        if (locations.features && locations.features.length > 0) {
          const { center} = locations.features[0];
          const [lng, lat] = center;
          createMarker(map,[lng, lat] )
          // Set the map center to the found location
          map.flyTo({ center: [lng, lat], zoom: 12 });
          setSearchQuery('');
        } 
      };
  
    return (
      <div className="sidebar-container">
        <LocationFinder 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}/>
        <RouteInfoProvider/>
        <SearchResults locationNames={locationNames}/>
        <RouteStyler/>
      </div>
    );
    
  }