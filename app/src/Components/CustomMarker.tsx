import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomMarker: React.FC<{ source: any }> = ({ source }) => {
  return (
    <View style={styles.marker}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30, 
    height: 30, 
    borderRadius: 20, 
    overflow: 'hidden',
    borderWidth: 2, 
    borderColor: 'green',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default CustomMarker;
