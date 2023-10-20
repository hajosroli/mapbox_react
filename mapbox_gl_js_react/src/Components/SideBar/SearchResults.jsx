import useSearchingInput from "../../Hooks/useSearchingInput"

export default function SearchResults(){
  const {locationNames} = useSearchingInput();

    return(
        <div className="search-results">
          {locationNames ? (
              locationNames.map((result, index) => (
               <div key={index} className="result-item">
                  {index === 0 && (
                    <span className="result-label start-label">
                      <strong>Start:</strong>
                    </span>
                  )}
                  {index > 0 && index < locationNames.length - 1 && (
                    <span className="result-label via-label">
                      <strong>via:</strong>
                    </span>
                  )}
                  {index > 0 && index === locationNames.length - 1 && (
                    <span className="result-label end-label">
                      <strong>End:</strong>
                    </span>
                  )}
                    <span>{result}</span>
                </div>
              ))
              ) : null}
        </div>
        )
}