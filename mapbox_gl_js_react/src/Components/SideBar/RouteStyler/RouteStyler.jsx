import useRouteContext from "../../../Context/useRouteContext";
import "./RouteStyler.css"

export default function RouteStyler(){
    const{
        color, 
        setColor, 
        lineWidth, 
        setLineWidth } = useRouteContext();
        
        return (
          <div className="styling-container">
            <h1 className="styling-header">Edit Route Style:</h1>
            <div className="input-label-group">
              <label className="input-label input-label--color" htmlFor="color-picker">
                <p> Color:</p>
              </label>
              <input
                type="color"
                name="color-picker"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="input-label-group">
              <label className="input-label input-label--width" htmlFor="route-line-width">
                <p>Width:</p>
              </label>
              <input
                type="range"
                name="route-line-width"
                min={2}
                max={20}
                step={1}
                value={lineWidth}
                onChange={(e) => setLineWidth(e.target.value)}
              />
            </div>
          </div>
        );
        
}