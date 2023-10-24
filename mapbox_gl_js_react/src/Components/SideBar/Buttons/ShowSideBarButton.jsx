import {Button} from 'react-bootstrap';
import useMapContext from '../../../Context/useMapContext';
import './ShowSideBarButton.css'

export default function ShowSideBarButton(){
    const {isSideBarVisible, setIsSideBarVisible} = useMapContext();

    return(
        <div className='show-button-container'>
            <Button className={`show-button${isSideBarVisible ? '-hide' : '-show'}`} onClick={() => setIsSideBarVisible(!isSideBarVisible)}>
                {isSideBarVisible ? "Hide" : "Show"} Sidebar
            </Button>
        </div>
    )
}