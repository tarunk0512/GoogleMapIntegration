import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Animated, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { getCurrentLocation, fetchDestinationCoordinates, toggleDialog, moveDestination, isMoveButtonEnabled } from './utils';
import CustomMarker from '../Components/CustomMarker';
import DestinationInputs from '../Components/DestinationInputs';
import Directions from '../Components/Direction';
import LocationButton from '../Components/LocationButton';
import ToggleDialogButton from '../Components/ToggleDialogButton';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBoK5kmcGEn9UKw7YclW6xeNiHUfJf9IDE'; // Replace with your actual API key

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
  const dialogHeight = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    getCurrentLocation(setOrigin, setRegion, mapRef);
  }, []);
  const handleFetchDestinationCoordinates = () => {
    fetchDestinationCoordinates(destinationInputs, setDestinations, GOOGLE_MAPS_APIKEY);
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
              title={'Current Location'}
              //description={'Current Location'}
              >
                <CustomMarker source={require('./../../../assets/current_location_marker.png')} />
              </Marker>            
          )}
          <Directions origin={origin} destinations={destinations} />

          {destinations.map((destination, index) => (
            <Marker
            key={index}
            coordinate={destination}
            title={`Destination : ${index + 1}`}
            description={`This is destination ${index + 1}`}
            />
         ))}
        </MapView>

        <Animated.View style={[styles.inputContainer, { height: dialogHeight }]}>
          <DestinationInputs 
            destinationInputs={destinationInputs} 
            setDestinationInputs={setDestinationInputs} 
            moveDestination={moveDestination} 
            fetchDestinationCoordinates={handleFetchDestinationCoordinates}
            isDialogVisible={isDialogVisible} 
          />
        </Animated.View>

        <ToggleDialogButton 
          toggleDialog={() => toggleDialog(dialogHeight, isDialogVisible, setIsDialogVisible)} 
          isDialogVisible={isDialogVisible} 
        />

        <LocationButton getCurrentLocation={() => getCurrentLocation(setOrigin, setRegion, mapRef)} />
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
});
