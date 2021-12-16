// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './components/Home'
import InitialScreen from './components/InitialScreen'
import Certificate from './components/Certificate';
import Advise from './components/Advise';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}
      >
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{title: "Thông tin cá nhân"}} name="Initial" component={InitialScreen} />
        <Stack.Screen name="Certificate" component={Certificate} />
        <Stack.Screen name="Advise" component={Advise} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;