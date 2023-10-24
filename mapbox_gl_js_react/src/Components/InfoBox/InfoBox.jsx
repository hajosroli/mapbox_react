import "./InfoBox.css";

export default function InfoBox({lng, lat, zoom}){
    
    return(
        <div className="info-box">
            Longitude: {lng}
            <br />
            Latitude: {lat}
            <br />
            Zoom: {zoom}
        </div>
    )
}