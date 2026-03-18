import { StatusBar } from 'expo-status-bar';
import {} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "screens/HomeScreen.js";
import ProductDetail from "screens/ProductDetail.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}