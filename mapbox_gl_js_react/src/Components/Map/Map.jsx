import React from 'react';
import "./Map.css"
import useMap from '../../Hooks/useMap';
import { ShowSideBarButton } from '../SideBar/ShowSideBarButton/ShowSideBarButton';
import { InfoBox } from '../InfoBox/InfoBox';

export default function Map({isSideBarVisible}) {
  const {lng, lat, zoom, mapContainer} = useMap()

  return (
    <div>
      {!isSideBarVisible ? <ShowSideBarButton/> : null }
      <InfoBox lng={lng} lat={lat} zoom={zoom}/>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

