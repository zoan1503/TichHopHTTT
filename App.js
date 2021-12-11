import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Map from "./components/Map"
import Home from "./components/Home";

function MyTab() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "Home"
                component = {Home}
            />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTab />
        </NavigationContainer>
    );
}

