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
    const [suggestedLocations, setSuggestedLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)
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

    useEffect(() => {
      if(searchQuery.length > 2){
        (async ()=>{
          let data = await fetchLocations(searchQuery);
          setSuggestedLocations(data.features);
          console.log(data.features[0].place_name)
          })()
      }
  }, [searchQuery])

  
  const handleSearch = () => {
          const { center} = selectedLocation;
          const [lng, lat] = center;
          createMarker(map,[lng, lat] )
          // Set the map center to the found location
          map.flyTo({ center: [lng, lat], zoom: 12 });
          setSearchQuery('');
          setSelectedLocation(null)
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSuggestedLocations([])
  };
 
  // Setting the value of the input field
  const setInputValue = () => {
    if(selectedLocation !== null){
        return selectedLocation.place_name;
    }
    else{return searchQuery}
  }

    return (
      <div className="sidebar-container">
        <LocationFinder  
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          suggestedLocations={suggestedLocations}
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
          handleLocationSelect={handleLocationSelect}
          setInputValue={setInputValue}/>
        <RouteInfoProvider/>
        <SearchResults locationNames={locationNames}/>
        <RouteStyler/>
      </div>
    );
    
  }