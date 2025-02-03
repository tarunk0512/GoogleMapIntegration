import { useNavigation, useRoute} from "@react-navigation/native";

// HomeScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

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
