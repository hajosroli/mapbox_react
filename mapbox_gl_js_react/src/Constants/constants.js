const token = process.env.REACT_APP_ACCESS_TOKEN;

const ACCESS_TOKEN_FOR_LOCATION_URLS= `.json?&access_token=${token}`
const ACCESS_TOKEN_FOR_LOCATION_URLS_AUTOCOMPLETE= `.json?autocomplete=true&access_token=${token}`

const MAPBOX_API_URL = `https://api.mapbox.com/`;

const DIRECTIONS_API= `${MAPBOX_API_URL}directions/v5/mapbox/`;

const DIRECTIONS_PARAMS = `?geometries=geojson&access_token=${token}`;

const GEOCODING_API_URL = `${MAPBOX_API_URL}geocoding/v5/mapbox.places/`

export{
    token,
    DIRECTIONS_API,
    DIRECTIONS_PARAMS,
    GEOCODING_API_URL,
    ACCESS_TOKEN_FOR_LOCATION_URLS,
    ACCESS_TOKEN_FOR_LOCATION_URLS_AUTOCOMPLETE
}