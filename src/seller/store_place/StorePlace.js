import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import storeIcon from '../../images/location/store-icon.png';
// import LocationMarker from '../places/my-location/LocationMarker';
import UserLocation from './UserLocation';
import { getStoresPlaces } from '../../redux/places/storesPlacesReducer';
import MarkerPopUp from '../places/markerPopUp/MarkerPopUp';
import 'leaflet/dist/leaflet.css';
import './StorePlace.css';

const StorePlace = () => {
  const [center, setCenter] = useState([-2.8774, 23.6569]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoresPlaces());
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
        },
      );
    }
  }, []);

  const storeData = useSelector((state) => state.getStoreShowReducer);

  const {
    categories,
    country,
    id,
    images_url,
    location,
    name,
    user_id,
    token_id,
    main_image_url,
    coordinate,
  } = storeData;

  const customIcon = L.icon({
    iconUrl: main_image_url || storeIcon,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
    className: 'leaflet-location-icon icon-move',
  });

  return (
    <div className="place-main-container">
      <h2>
        {name}
        {' '}
        Location
      </h2>
      <Link to={`../store/${token_id}`}>
        {'< '}
        Back to the store
      </Link>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        style={{
          width: '90%',
          position: 'relative',
          height: '90%',
          outline: 'none',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          coordinate ? (
            <>
              <Marker
                position={[coordinate[0], coordinate[1]]}
                key={coordinate[0]}
                icon={customIcon}
              >
                <Popup>
                  <MarkerPopUp data={storeData} />
                </Popup>
              </Marker>
              <FlyToCoordinates latitude={coordinate[0]} longitude={coordinate[1]} />
            </>
          )
            : (<></>)
        }
        <UserLocation />
      </MapContainer>
    </div>
  );
};

const FlyToCoordinates = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 15);
    }
  }, [latitude, longitude, map]);

  return null;
};

export default StorePlace;
