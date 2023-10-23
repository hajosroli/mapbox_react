import React from 'react';
import Map from './Components/Map/Map';
import SideBar from './Components/SideBar/SideBar';
import useMapContext from "./Context/useMapContext";
import { RouteContextProvider } from './Context/useRouteContext';

function App() {
    const {isSideBarVisible} = useMapContext();
  
  return (
    <RouteContextProvider>
      <div className='app-container'>
        <Map isSideBarVisible={isSideBarVisible}/>
        {isSideBarVisible ? <SideBar /> : null} 
      </div>
    </RouteContextProvider>
  );
}

export default App;