import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import { MapContextProvider } from "./Context/useMapContext";

ReactDOM.render(
  <>
  <React.StrictMode>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </React.StrictMode>
  </>, 
  document.getElementById('root')
);
