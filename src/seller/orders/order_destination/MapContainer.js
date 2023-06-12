import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
} from 'react-leaflet';
import mapData from '../../../mapData/countries.json';

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const LocationFinder = () => {
  const map = useMapEvents({
    click(e) {
      console.log(e);
    },
  });
  return null;
};

const OrderMapContainer = () => (
  <div className="create-order-map-wrapper">
    <MapContainer
      center={{ lat: 1.6792, lng: 29.2218 }}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationFinder />
      {/* <LocationMarker /> */}
      <GeoJSON
        style={{ color: 'blue' }}
        data={mapData.features}
      />
    </MapContainer>
  </div>
);

export default OrderMapContainer;
