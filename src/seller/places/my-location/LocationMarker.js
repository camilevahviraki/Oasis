import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLocation } from '../../../redux/places/currentLocationReducer';
import locationIcon from '../../../images/location/location.png';

const LocationMarker = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const [position, setPosition] = useState(null);

  const { user } = userData;
  const customIcon = L.icon({
    iconUrl: user.avatar_url ? user.avatar_url : locationIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    className: 'leaflet-my-location-icon',
  });

  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 12);
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.className = 'Leaflet-position-circle';
      circle.addTo(map);
      dispatch(setCurrentLocation([e.latitude, e.longitude]));
    });
  }, []);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
