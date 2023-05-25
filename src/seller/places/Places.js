import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
// import { MdRestaurant } from "react-icons/md";
// import { IoFastFood } from "react-icons/io";
import storeIcon from '../../images/location/store-icon.png';
import LocationMarker from './my-location/LocationMarker';
import { getStoresPlaces } from '../../redux/places/storesPlacesReducer';
import MarkerPopUp from './markerPopUp/MarkerPopUp';
import 'leaflet/dist/leaflet.css';
import './Places.css';

const Places = () => {
  const [center] = useState([-2.8774, 23.6569]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStoresPlaces());
  }, []);

  const stores = useSelector((state) => state.storesPlacesReducer);

  const customIcon = L.icon({
    iconUrl: storeIcon,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
    className: 'leaflet-location-icon',
  });

  console.log(stores);

  return (
    <div className="place-main-container">
      <MapContainer
        onClick={(e) => handleClick(e)}
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        style={{
          width: '100%',
          position: 'relative',
          height: '100%',
          outline: 'none',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stores.map(
          (store) => {
            const {
              coordinate,
            } = store;
            if (coordinate) {
              return (
                <Marker
                  position={[coordinate[0], coordinate[1]]}
                  key={coordinate[0]}
                  icon={customIcon}
                >
                  <Popup>
                    <MarkerPopUp data={store} />
                  </Popup>
                </Marker>
              );
            }
          },
        )}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Places;
