// HomeScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen: React.FC = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
