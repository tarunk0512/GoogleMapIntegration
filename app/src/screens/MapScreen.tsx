// MapScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as Location from 'expo-location';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const MapScreen: React.FC = () => {
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destinations, setDestinations] = useState<{ latitude: number; longitude: number }[]>([]);
  const [destinationInputs, setDestinationInputs] = useState<string[]>(['', '', '']);
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0428,
}); 
const [isDialogVisible, setIsDialogVisible] = useState<boolean>(true); 
const mapRef = useRef<MapView>(null); 
const dialogHeight = useRef(new Animated.Value(200)).current; // Initial height for the dialog

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBoK5kmcGEn9UKw7YclW6xeNiHUfJf9IDE'; // Add your API Key here

  const fetchDestinationCoordinates = async () => {
    try {
      const newDestinations: { latitude: number; longitude: number }[] = [];
      for (const place of destinationInputs) {
        if (place.trim() !== '') {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${GOOGLE_MAPS_APIKEY}`
          );

          const { lat, lng } = response.data.results[0].geometry.location;
          newDestinations.push({ latitude: lat, longitude: lng });
        }
      }
      setDestinations(newDestinations);
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
      mapRef.current?.animateCamera({
        center: {
          latitude,
          longitude,
        },
        zoom: 15, // Adjust the zoom level as needed
      }, { duration: 1000 });
      Alert.alert('Location fetched', `Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      Alert.alert('Error fetching location', error.message);
    }
  };

  // Fetch current location when the component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const toggleDialog = () => {
    const toValue = isDialogVisible ? 0 : 200; // Collapse to 0 or expand to 200
    Animated.timing(dialogHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDialogVisible(!isDialogVisible);
  };

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
              title={'1: Origin'}
              description={'This is the starting point'}
            />
          )}
          {destinations.map((destination, index) => (
              <Marker
                key={index}
                coordinate={destination}
                title={`${index + 2}: Destination`}
                description={`This is destination ${index + 1}`}
              />
            ))}
           {origin && destinations.length > 0 && (
              <MapViewDirections
                origin={origin}
                waypoints={destinations.slice(0, -1)}
                destination={destinations[destinations.length - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="blue"
              />
            )}
        </MapView>
        <Animated.View style={[styles.inputContainer, { height: dialogHeight }]}>
          {isDialogVisible && (
            <View>
              {destinationInputs.map((input, index) => (
                <TextInput
                  key={index}
                  placeholder={`Enter Destination ${index + 1}`}
                  style={styles.input}
                  value={input}
                  onChangeText={(text) => {
                    const newInputs = [...destinationInputs];
                    newInputs[index] = text;
                    setDestinationInputs(newInputs);
                  }}
                />
              ))}
              <Button
                title="Add Destination"
                onPress={fetchDestinationCoordinates}
              />
            </View>
          )}
        </Animated.View>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleDialog}
        >
          <FontAwesome6 name={isDialogVisible ? "chevron-up" : "chevron-down"} size={24} color="black" />
        </TouchableOpacity>
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
  toggleButton: { position: 'absolute',
    top: 5, 
    right: 10,
    backgroundColor: '#D8BFD8',
    borderRadius: 20, 
    padding: 10, 
    elevation: 5,
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
