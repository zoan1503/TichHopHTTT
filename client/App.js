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
import SignUp from './components/SignUp'
import Login from './components/Login'
import Map from './components/Map'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}
        >
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ title: "Thông tin cá nhân" }} name="Certificate" component={Certificate} />
          <Stack.Screen options={{ title: "Thông tin cá nhân" }} name="Initial" component={InitialScreen} />
          <Stack.Screen options={{ title: "Đăng ký" }} name="SignUp" component={SignUp} />
          <Stack.Screen options={{ title: "Đăng nhập" }} name="Login" component={Login} />
          <Stack.Screen options={{ title: "Bản đồ" }} name="Map" component={Map} />
          <Stack.Screen name="Advise" component={Advise} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
