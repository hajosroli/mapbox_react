import React from 'react';
import Map from './Components/Map/Map';
import SideBar from './Components/SideBar/SideBar';

import { MapContext, MapContextProvider } from "./Context/useMapContext";

function App() {
    
  return (
  
    <MapContextProvider>
      <div className='app-container'>
        <Map />
        <SideBar />
      </div>
    </MapContextProvider>
  );
}

export default App;