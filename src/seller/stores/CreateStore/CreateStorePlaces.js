import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { MdRestaurant } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { IoFastFood } from 'react-icons/io';
import LocationMarker from '../../places/my-location/LocationMarker';
import storeIcon from '../../../images/location/store-icon.png';
import {
  addStorePlaces,
  createStoreProgress,
  addCoordinatesToStore,
} from '../../../redux/stores/createStoreReducer';
import { updateStorePlaces, resetStoreFieldToUpdate } from '../../../redux/stores/updateStoreReducer';

const LocationClicked = () => {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      dispatch(addCoordinatesToStore([lat, lng]));
    },
  });
  const customIcon = L.icon({
    iconUrl: storeIcon,
    iconSize: [30, 30],
    iconAnchor: [10, 20],
    className: 'leaflet-location-icon',
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Choosen Location</Popup>
    </Marker>
  );
};

const CreateStorePlaces = (props) => {
  const dispatch = useDispatch();
  let functionToDispatch = addStorePlaces;
  const storeData = useSelector((state) => state.createStoresReducer);
  const userData = useSelector((state) => state.authenticationReducer);
  const updateStoreData = useSelector((state) => state.updateStoreReducer);
  const { response } = updateStoreData;
  const { token } = userData;
  const { updateStore, storeIdOnUpdate } = props;
  if (updateStore) {
    functionToDispatch = updateStorePlaces;
  }
  const [message, setMessage] = useState(
    'Choose a location for your store by clicking on the Map or use your current Location',
  );
  const [showLoader, setLoader] = useState(false);
  const [showLoader2, setLoader2] = useState(false);
  const clickedCoordinates = useSelector(
    (state) => state.createStoresReducer.coordinates,
  );
  const currentLocation = useSelector((state) => state.currentLocationReducer);
  const savePlaces = (myLocation) => {
    if (myLocation) {
      if (currentLocation) {
        dispatch(
          functionToDispatch(
            {
              places: currentLocation,
              step: 4,
              store_id: updateStore
                ? storeIdOnUpdate
                : storeData.storeId.store_id,
              user_id: userData.user.id,
            },
            token,
          ),
        );
        setMessage(null);
        setLoader2(true);
      } else {
        setMessage(
          'Cooldnt find your location! Refresh the page or click on the Map',
        );
      }
    } else if (clickedCoordinates) {
      dispatch(
        functionToDispatch(
          {
            places: clickedCoordinates,
            step: 4,
            store_id: updateStore
              ? storeIdOnUpdate
              : storeData.storeId.store_id,
            user_id: userData.user.id,
          },
          token,
        ),
      );
      setMessage(null);
      setLoader(true);
    } else {
      setMessage(
        'Choose a location by clicking on the map before the next step!',
      );
    }
  };

  console.log('=====>', response);

  useEffect(() => {
    if (response === 'Updated coordinates') {
      setLoader(false);
      setLoader2(false);

      setMessage('Coordinates updated successfully!');
      dispatch(resetStoreFieldToUpdate());
    }
  }, [response]);

  if (props.progress === 4) {
    return (
      <div className="create-store-places">
        <h2>{updateStore ? 'Update Coordinates' : 'Store Location'}</h2>
        <div
          style={{
            width: '60vw',
            height: 'calc(50vh )',
            border: '1px solid gray',
          }}
        >
          <MapContainer
            center={[-2.8774, 23.6569]}
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

            <LocationMarker />
            <LocationClicked />
          </MapContainer>
        </div>
        <p>{message}</p>

        <div className="row">
          <button
            type="button"
            onClick={() => savePlaces(false)}
            className="create-store-submit"
          >
            {showLoader ? (
              <FiLoader className="button-loader" color="#fff" />
            ) : (
              <>{updateStore ? 'Set New Location' : 'Set Location'}</>
            )}
          </button>
          or
          <button
            type="button"
            className="create-store-submit"
            onClick={() => savePlaces(true)}
          >
            {showLoader2 ? (
              <FiLoader className="button-loader" color="#fff" />
            ) : (
              'Use your current Location'
            )}
          </button>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CreateStorePlaces;
