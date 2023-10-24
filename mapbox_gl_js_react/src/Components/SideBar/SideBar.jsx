import LocationFinder from "./LocationFinder/LocationFinder";
import RouteInfoProvider from "./RouteInfoProvider/RouteInfoProvider";
import RouteStyler from "./RouteStyler/RouteStyler";
import RouteModeSelector from "./RoutingProfileSelector/RouteModeSelector";
import SearchResults from "./SearchResults/SearchResults";
import ShowSideBarButton from "./Buttons/ShowSideBarButton";
import "./SideBar.css";
import React from 'react';
import ClearMarkersButton from "./Buttons/ClearMarkersButton";

export default function SideBar() {
    
    return (
      <div className="sidebar-container">
        <div className="button-container">
          <ClearMarkersButton/>
          <ShowSideBarButton/>
        </div>
        <LocationFinder/>
        <RouteModeSelector />
        <RouteInfoProvider/>
        <SearchResults/>
        <RouteStyler/>
      </div>
    ); 
  }