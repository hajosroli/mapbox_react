 import {
    DIRECTIONS_API_DRIVING, 
    DIRECTIONS_PARAMS,
    GEOCODING_API_URL,
    ACCESS_TOKEN_FOR_LOCATION_URLS,
    ACCESS_TOKEN_FOR_LOCATION_URLS_AUTOCOMPLETE} from "../Constants/constants.js"

 // Get routes from Api
export const fetchRoute = async (coordinates) => {
    try {
      const response = await fetch(`${DIRECTIONS_API_DRIVING}${coordinates}${DIRECTIONS_PARAMS}`,
       { method: 'GET' });
      const data = await response.json();
      return data.routes[0];
    } catch (error) {
      console.error('Error fetching route:', error);
      return [];
    }
  };

 //Get locations by searching them by text inputs
 export const fetchLocations = async (searchQuery) => {
    try {
      const response = await fetch(
        `${GEOCODING_API_URL}${searchQuery}${ACCESS_TOKEN_FOR_LOCATION_URLS_AUTOCOMPLETE}`,
        {
          method: "GET",
        }
      );
        if(response.ok){
          const data = await response.json()
          console.log("fetchLocations" + data)
          return data;
        } else {
          console.error("Failed to fetch locations");
          return [];
        } 
      } catch (error) {
        console.error("Error fetching locations:", error);
    }
  };
  
  //Get the name of the locations of markers
  export const fetchLocationsName = async (markers) => {
      let locations = [];
      for(let i =0; i < markers.length; i++){
          try {
              // Name of Location search
              const response = await fetch(
                `${GEOCODING_API_URL}${markers[i].lng}, ${markers[i].lat}${ACCESS_TOKEN_FOR_LOCATION_URLS}`
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
  