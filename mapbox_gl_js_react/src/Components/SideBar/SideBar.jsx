import LocationFinder from "./LocationFinder/LocationFinder";
import RouteInfoProvider from "./RouteInfoProvider/RouteInfoProvider";
import RouteStyler from "./RouteStyler/RouteStyler";
import SearchResults from "./SearchResults/SearchResults";
import { ShowSideBarButton } from "./ShowSideBarButton/ShowSideBarButton";
import "./SideBar.css";
import React from 'react';

export default function SideBar() {
    
    return (
      <div className="sidebar-container">
        <div className="button-container">
        <ShowSideBarButton/>
        </div>
        <LocationFinder/>
        <RouteInfoProvider/>
        <SearchResults/>
        <RouteStyler/>
      </div>
    );
    
  }