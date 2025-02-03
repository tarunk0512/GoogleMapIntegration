import { Animated, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

export const toggleDialog = (dialogHeight, isDialogVisible, setIsDialogVisible) => {
  const toValue = isDialogVisible ? 0 : 200;
  Animated.timing(dialogHeight, {
    toValue,
    duration: 300,
    useNativeDriver: false,
  }).start();
  setIsDialogVisible(!isDialogVisible);
};

export const getCurrentLocation = async (setOrigin, setRegion, mapRef) => {
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

    mapRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
      zoom: 10,
    }, { duration: 1000 });
    Alert.alert('Location fetched', `Latitude: ${latitude}, Longitude: ${longitude}`);
  } catch (error) {
    Alert.alert('Error fetching location', error.message);
  }
};

export const fetchDestinationCoordinates = async (destinationInputs, setDestinations, GOOGLE_MAPS_APIKEY) => {
  try {
    const newDestinations = [];
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

export const moveDestination = (fromIndex, toIndex, destinationInputs, setDestinationInputs, destinations, setDestinations) => {
  const newInputs = [...destinationInputs]; 
  const newDestinations = [...destinations]; 
  const input = newInputs.splice(fromIndex, 1)[0]; 
  const destination = newDestinations.splice(fromIndex, 1)[0]; 
  newInputs.splice(toIndex, 0, input); newDestinations.splice(toIndex, 0, destination); 
  setDestinationInputs(newInputs); setDestinations(newDestinations);
};

export const isMoveButtonEnabled = (index, destinationInputs) => {
  return destinationInputs[index].trim() !== '';
};
