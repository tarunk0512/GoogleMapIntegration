// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './app/src/screens/HomeScreen';
import MapScreen from './app/src/screens/MapScreen';

const Stack = createNativeStackNavigator();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions ={{
        headerShown: false,
        }}
        >
      {/* </Stack.Navigator><Stack.Navigator initialRouteName="Home"> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
