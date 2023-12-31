import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faWalking, faBicycle } from '@fortawesome/free-solid-svg-icons';
import "./RouteModeSelector.css"
import useRouteContext from '../../../Context/useRouteContext';

export default function RouteModeSelector(){
    const {setRouteMode} = useRouteContext();
    
    return (
        <div>
            <h1>Choose Mode:</h1>
            <div className="mode-icons">
                <FontAwesomeIcon 
                className='fa-icon fa-icon__driving' 
                icon={faCar} 
                onClick={() => setRouteMode('driving')} />
                <FontAwesomeIcon 
                className='fa-icon fa-icon__walking'  
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