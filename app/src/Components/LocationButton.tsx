import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const LocationButton = ({ getCurrentLocation }) => {
  return (
    <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
      <FontAwesome6 name="location-crosshairs" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default LocationButton;

const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#D8BFD8',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});
