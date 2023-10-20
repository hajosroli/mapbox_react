import LocationFinder from "./LocationFinder";
import RouteInfoProvider from "./RouteInfoProvider";
import RouteStyler from "./RouteStyler";
import SearchResults from "./SearchResults";
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