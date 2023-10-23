import { createContext, useState, useContext } from "react";

export const MapContext = createContext(null);

export const MapContextProvider = (props) => {
    const [markersObj, setMarkersObj] = useState([]);
    const [map, setMap] = useState(null);
    const [isSideBarVisible, setIsSideBarVisible] = useState(true);
    const [isMarkerLimitReached, setIsMarkerLimitReached] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const markerLimit = 6;
     
    const mapProvider = (currentMap) => {
        setMap(currentMap)
    }

    return <MapContext.Provider 
        value={{
            markersObj,
            setMarkersObj, 
            mapProvider,
            map,
            isSideBarVisible,
            setIsSideBarVisible,
            markerLimit,
            isMarkerLimitReached,
            setIsMarkerLimitReached,
            showAlert,
            setShowAlert,
            errorMessage,
            setErrorMessage 
            }}>
          {props.children}
        </MapContext.Provider>;
}
export default function useMapContext() {
  return useContext(MapContext);
}


