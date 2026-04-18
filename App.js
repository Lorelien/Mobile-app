import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import BlogDetail from "./screens/BlogDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Koffie" }} />
        <Stack.Screen name="Details" component={ProductDetail} options={{ title: "Product" }} />
        <Stack.Screen name="BlogDetails" component={BlogDetail} options={{ title: "Blog" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}