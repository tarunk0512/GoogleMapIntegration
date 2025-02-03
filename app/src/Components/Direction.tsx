import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'YOUR_API_KEY_HERE';

const Directions = ({ origin, destinations }) => {
  return (
    origin && destinations.length > 0 && (
      <MapViewDirections
        origin={origin}
        waypoints={destinations.slice(0, -1)}
        destination={destinations[destinations.length - 1]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="#4A90E2"
      />
    )
  );
};

export default Directions;
