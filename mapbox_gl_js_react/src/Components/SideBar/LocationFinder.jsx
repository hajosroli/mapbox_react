export default function LocationFinder({searchQuery, setSearchQuery, handleSearch}){
    
    return(
        <div className="location-search-container">
        <h1>Find Location</h1>
        <div className="location-search">
          <input
            type="text"
            placeholder="Find a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button  onClick={handleSearch}>Search</button>
        </div>
        </div>
    )
}