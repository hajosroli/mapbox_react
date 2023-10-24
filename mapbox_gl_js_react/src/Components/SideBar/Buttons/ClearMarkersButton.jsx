import {Button} from 'react-bootstrap';
import { useMarkers } from '../../../Hooks/useMarkers';
import useMapContext from '../../../Context/useMapContext';
import './ClearMarkersButton.css'

export default function ClearMarkersButton(){
    const { removeAllMarkers} = useMarkers();
    const {markersObj} = useMapContext();

    return(
        <div>
            <Button 
            className='remove-button'
            onClick={removeAllMarkers}
            disabled={markersObj.length === 0} >
                Clear Markers
            </Button>
        </div>
    )
}