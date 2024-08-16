'use client';

import React, { useMemo } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '250px',
  
};

export const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const mapCenter = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude]
  );

  if (!isLoaded) return <div>Ładowanie mapy...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={mapCenter}
    >
      <Marker position={mapCenter} />
    </GoogleMap>
  );
};
