import LocationFinder from "./LocationFinder/LocationFinder";
import RouteInfoProvider from "./RouteInfoProvider/RouteInfoProvider";
import RouteStyler from "./RouteStyler/RouteStyler";
import SearchResults from "./SearchResults/SearchResults";
import "./SideBar.css";
import React from 'react';

export default function SideBar() {
    
    return (
      <div className="sidebar-container">
        <LocationFinder/>
        <RouteInfoProvider/>
        <SearchResults/>
        <RouteStyler/>
      </div>
    );
    
  }