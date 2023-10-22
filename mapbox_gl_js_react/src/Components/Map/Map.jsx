import React from 'react';
import "./Map.css"
import useMap from '../../Hooks/useMap';
import { ShowSideBarButton } from '../SideBar/ShowSideBarButton/ShowSideBarButton';
import { InfoBox } from '../InfoBox/InfoBox';
import useMapContext from '../../Context/useMapContext';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function Map({isSideBarVisible}) {
  const {lng, lat, zoom, mapContainer} = useMap()
  const {showAlert, setShowAlert} = useMapContext()

  return (
    <div>
      {!isSideBarVisible ? <ShowSideBarButton/> : null }
      <InfoBox lng={lng} lat={lat} zoom={zoom}/>
      {showAlert ? <AlertMessage setShowAlert={setShowAlert}/> : null}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

