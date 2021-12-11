import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Map from './Map'
import { FontAwesome, FontAwesome5, Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';


const Tab = createMaterialBottomTabNavigator();

function MyTabs({}) {
    return (
        <Tab.Navigator
            initialRouteName="Map"
            activeColor="white"
            labelStyle={{ fontSize: 12 }}
            barStyle={{ backgroundColor: '#326' }}
        >
            <Tab.Screen
                name="Map"
                component={() => <Map/>}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Home() {
    return (
        <MyTabs/>
    );
}
