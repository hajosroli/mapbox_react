import useSearchingInput from "../../../Hooks/useSearchingInput"
import "./SearchResults.css"

export default function SearchResults(){
  const {locationNames} = useSearchingInput();

  return (
    <div className="search-results">
      {locationNames ? (
        locationNames.map((result, index) => (
          <div key={index} data-text={result} className="result-item">
            {index === 0 && (
              <span className="result-label result-label--start">
                <strong>Start:</strong>
              </span>
            )}
            {index > 0 && index < locationNames.length - 1 && (
              <span className="result-label result-label--via">
                <strong>via:</strong>
              </span>
            )}
            {index > 0 && index === locationNames.length - 1 && (
              <span className="result-label result-label--end">
                <strong>End:</strong>
              </span>
            )}
            <span className="result-item__span" title={result} >{result}</span>
          </div>
        ))
      ) : null}
    </div>
  );
  
}