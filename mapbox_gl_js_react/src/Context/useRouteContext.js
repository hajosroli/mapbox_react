import { createContext, useState, useContext } from "react";

export const RouteContext = createContext(null);

export const RouteContextProvider = (props) => {
    const [routeInfo, setRouteInfo] = useState({
        distance: null,
        duration: null,
      });
      const [routeCoord, setRouteCoord] = useState([]);
      const [color, setColor] = useState('#0000FF');
      const [lineWidth, setLineWidth] = useState(5);
      const [routeMode, setRouteMode] = useState('driving');
      
    return <RouteContext.Provider 
        value={{
            routeCoord, 
            setRouteCoord, 
            routeInfo, 
            setRouteInfo,
            color,
            setColor,
            lineWidth,
            setLineWidth,
            routeMode,
            setRouteMode,
            }}>
          {props.children}
        </RouteContext.Provider>;
}
export default function useRouteContext() {
  return useContext(RouteContext);
}


