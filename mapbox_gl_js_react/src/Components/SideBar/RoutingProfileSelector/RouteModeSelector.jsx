import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faWalking, faBicycle } from '@fortawesome/free-solid-svg-icons';
import useMapContext from '../../../Context/useMapContext';
import "./RouteModeSelector.css"

export const RouteModeSelector = () => {
    const {setRouteMode} = useMapContext()
    
    return (
        <div>
            <h1>Choose Mode:</h1>
            <div className="mode-icons">
                <FontAwesomeIcon 
                className='fa-icon' 
                icon={faCar} 
                onClick={() => setRouteMode('driving')} />
                <FontAwesomeIcon 
                className='fa-icon' 
                icon={faWalking} 
                onClick={() => setRouteMode('walking')} />
                <FontAwesomeIcon 
                className='fa-icon' 
                icon={faBicycle} 
                onClick={() => setRouteMode('cycling')} />
            </div>
        </div>
    )
}