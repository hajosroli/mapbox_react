import useMapContext from "../../../Context/useMapContext";
import "./RouteInfoProvider.css"

export default function RouteInfoProvider(){
    const {routeInfo} = useMapContext();

    const formattedDuration = () => {
        const hours = Math.floor(routeInfo.duration / 60);
        const minutes = routeInfo.duration % 60;
        return routeInfo.duration
        ? `${hours > 0 ? `${hours} hours` : ''}${minutes > 0 ? ` ${minutes} mins` : ''}`
        : 'N/A';
    }
   
    const formattedDistance = routeInfo.distance ? `${routeInfo.distance} km` : 'N/A';

    return (
      <div className="route-info">
        <h1 className="route-info__header">Route Information:</h1>
        <table className="route-info__table">
          <tbody>
            <tr className="route-info__row">
              <td className="route-info__cell route-info__cell--label">
                <p>Duration:</p>
              </td>
              <td className="route-info__cell route-info__cell--value">
                {formattedDuration()}
              </td>
            </tr>
            <tr className="route-info__row">
              <td className="route-info__cell route-info__cell--label">
                <p>Distance:</p>
              </td>
              <td className="route-info__cell route-info__cell--value">
                {formattedDistance}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    
}