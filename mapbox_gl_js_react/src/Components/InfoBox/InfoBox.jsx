import "./InfoBox.css";

export const InfoBox = ({lng, lat, zoom}) => {
    
    return(
        <div className="info-box">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    )
}