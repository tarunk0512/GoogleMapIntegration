// MapScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as Location from 'expo-location';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const MapScreen: React.FC = () => {
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<string>('');
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0428,
  });

  const mapRef = useRef<MapView>(null);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBoK5kmcGEn9UKw7YclW6xeNiHUfJf9IDE'; // Add your API Key here

  const fetchDestinationCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destinationPlace)}&key=${GOOGLE_MAPS_APIKEY}`
      );

      const { lat, lng } = response.data.results[0].geometry.location;

      setDestination({
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.error('Error fetching destination coordinates:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      const newRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0428,
      };
      setRegion(newRegion);

      // Animate the map to the new region
      mapRef.current?.animateToRegion(newRegion, 1000);
      Alert.alert('Location fetched', `Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      Alert.alert('Error fetching location', error.message);
    }
  };

  // Fetch current location when the component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {origin && (
            <Marker
              coordinate={origin}
              title={'Origin'}
              description={'This is the starting point'}
            />
          )}
          {destination && (
            <>
              <Marker
                coordinate={destination}
                title={'Destination'}
                description={'This is the destination'}
              />
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="blue"
              />
            </>
          )}
        </MapView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter The Destination"
            style={styles.input}
            onChangeText={(text) => setDestinationPlace(text)}
          />
          <Button
            title="Get Directions"
            onPress={fetchDestinationCoordinates}
          />
        </View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <FontAwesome6 name="location-crosshairs" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: 'absolute',
    top: 10,
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
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
