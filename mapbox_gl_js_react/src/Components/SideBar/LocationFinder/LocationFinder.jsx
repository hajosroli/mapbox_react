import useSearchingInput from "../../../Hooks/useSearchingInput";
import "./LocationFinder.css"

export default function LocationFinder(){
  const {setSearchQuery,
    handleSearch, 
    suggestedLocations,
    selectedLocation, 
    handleLocationSelect,
    setInputValue,
    searchingResultError} = useSearchingInput()

    return (
      <div className="location-search-container">
        <h1 className="location-search__title">Find Location:</h1>
        <div className="location-search">
          <input
            type="text"
            placeholder="Search for location"
            value={setInputValue()}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="location-search__input"
          />
          {searchingResultError ? <p>{searchingResultError}</p> : null}
          {suggestedLocations.length > 0 ? (
            <div className="suggestions-container">
              {suggestedLocations.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleLocationSelect(suggestion)}
                  className="suggestion"
                  data-text={suggestion.place_name} 
                >
                  <p className="suggestion__text">{suggestion.place_name}</p>
                </div>
              ))}
            </div>
          ) : null}
          {selectedLocation ? (
            <button onClick={handleSearch} className="location-search__button">
              Search
            </button>
          ) : (
            <button disabled className="location-search__button location-search__button--disabled">
              Search
            </button>
          )}
        </div>
      </div>
    );  
}
     
      
