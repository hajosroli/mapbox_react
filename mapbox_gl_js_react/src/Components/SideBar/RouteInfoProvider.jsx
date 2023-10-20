import useMapContext from "../../Context/useMapContext";

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

    return(
        <div className="route-info">
        <h1>Route Information</h1>
        <table>
          <tbody>
            <tr>
              <td><p>Duration:</p></td>
              <td>{formattedDuration()}</td>
            </tr>
            <tr>
              <td><p>Distance:</p></td>
              <td>{formattedDistance}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
    )
}