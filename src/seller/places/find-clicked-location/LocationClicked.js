import {useState} from 'react';
import {  useMapEvents  } from "react-leaflet";

const LocationClicked = () => {
    const [position, setPostion] = useState(null);
    const map = useMapEvents({
      click(e) {
        setPostion(e.latlng);
      },
    });
    return position;
  };
  

export default LocationClicked