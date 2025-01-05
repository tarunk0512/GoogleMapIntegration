import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const App: React.FC = () => {
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number }>({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBoK5kmcGEn9UKw7YclW6xeNiHUfJf9IDE'; // Add your API Key here

  const handleDestinationSubmit = (lat: string, lng: string) => {
    setDestination({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 12.910,
            longitudeDelta: 77.588,
          }}>
          <Marker
            coordinate={origin}
            title={'Origin'}
            description={'This is the starting point'}
          />
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
                strokeColor="hotpink"
              />
            </>
          )}
        </MapView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Destination Latitude"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => handleDestinationSubmit(text, destination?.longitude?.toString() || '')}
          />
          <TextInput
            placeholder="Enter Destination Longitude"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => handleDestinationSubmit(destination?.latitude?.toString() || '', text)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

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
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
