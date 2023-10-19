import { createContext, useState, useContext } from "react";

export const MapContext = createContext(null);

export const MapContextProvider = (props) => {
    const [markersObj, setMarkersObj] = useState([]);
    const [routeInfo, setRouteInfo] = useState({
        distance: null,
        duration: null,
      });
      const [routeCoord, setRouteCoord] = useState([]);
      const [map, setMap] = useState(null)

    const mapProvider = (currentMap) => {
        setMap(currentMap)
    }

    return <MapContext.Provider 
        value={{
            markersObj,
            setMarkersObj, 
            routeCoord, 
            setRouteCoord, 
            routeInfo, 
            setRouteInfo,
            mapProvider,
            map
            }}>
        {props.children}
        </MapContext.Provider>;
}
export default function useMapContext() {
  return useContext(MapContext);
}


