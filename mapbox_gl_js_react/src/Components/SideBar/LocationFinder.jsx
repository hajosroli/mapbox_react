import useSearchingInput from "../../Hooks/useSearchingInput";

export default function LocationFinder(){
        const {setSearchQuery,
            handleSearch, 
            suggestedLocations,
            selectedLocation, 
            handleLocationSelect,
            setInputValue} = useSearchingInput()
  
    return (
        <div className="location-search-container">
            <h1>Find Location</h1>
            <div className="location-search">
                <input
                  type="text"
                  placeholder="Find a location"
                  value={setInputValue()}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
          
                {suggestedLocations.length > 0 ? (
                  <div className="suggestions-container">
                    {suggestedLocations.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleLocationSelect(suggestion)}
                        className="suggestion"
                      >
                        <p>{suggestion.place_name}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {selectedLocation ? (
                    <button onClick={handleSearch}>Search</button>
                    ) : (
                    <button disabled>Search</button>
                )} 
            </div>
        </div>
          );
          
        }
      
      
