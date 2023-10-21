import { createContext, useState, useContext } from "react";

export const MapContext = createContext(null);

export const MapContextProvider = (props) => {
    const [markersObj, setMarkersObj] = useState([]);
    const [routeInfo, setRouteInfo] = useState({
        distance: null,
        duration: null,
      });
      const [routeCoord, setRouteCoord] = useState([]);
      const [map, setMap] = useState(null);
      const [color, setColor] = useState('#0000FF');
      const [lineWidth, setLineWidth] = useState(5);
      const [isSideBarVisible, setIsSideBarVisible] = useState(true);
      const [routeMode, setRouteMode] = useState('driving');

    
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
            map,
            color,
            setColor,
            lineWidth,
            setLineWidth,
            isSideBarVisible,
            setIsSideBarVisible,
            routeMode,
            setRouteMode 
            }}>
        {props.children}
        </MapContext.Provider>;
}
export default function useMapContext() {
  return useContext(MapContext);
}


