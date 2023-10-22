import React from 'react';
import Map from './Components/Map/Map';
import SideBar from './Components/SideBar/SideBar';

import useMapContext, { MapContextProvider } from "./Context/useMapContext";

function App() {
    const {isSideBarVisible} = useMapContext();
  console.log(isSideBarVisible)
  return (
      <div className='app-container'>
        <Map isSideBarVisible={isSideBarVisible}/>
        {isSideBarVisible ? <SideBar /> : null} 
      </div>
  );
}

export default App;