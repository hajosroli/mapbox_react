import "./InfoBox.css";

export default function InfoBox({lng, lat, zoom}){
    
    return(
        <div className="info-box">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    )
}