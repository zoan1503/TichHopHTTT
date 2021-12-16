import React, { useState, useEffect } from 'react';
import {Platform, Text, View, StyleSheet, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location1 = await Location.getCurrentPositionAsync({});
            setLocation(location1);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    let lat = 15.7477266
    let long = 101.4136194

    if (text != 'Waiting..') {
        lat = location.coords.latitude
        long = location.coords.longitude
    }
    console.log(lat)

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     provider={PROVIDER_GOOGLE}
                     initialRegion={{
                         latitude: lat,
                         longitude: long,
                         latitudeDelta: 0.009,
                         longitudeDelta: 0.009,
                     }} >
                <Marker coordinate={{latitude: lat, longitude: long}}
                        title="Vị trí hiện tại" />
                <Marker coordinate={{latitude:20.974852, longitude:105.822919}}
                        title="Q. Hoàng Mai"
                        description="15 ca nhiễm mới"/>
                <Marker coordinate={{latitude:21.0051307, longitude:105.8443309}}
                        title="Q. Hai Bà Trưng"
                        description="42 ca nhiễm mới"/>
                <Marker coordinate={{latitude:21.0147066, longitude:105.8030134}}
                        title="Q. Đống Đa"
                        description="53 ca nhiễm mới"/>
                <Marker coordinate={{latitude:20.9950321, longitude:105.7996268}}
                        title="Q. Thanh Xuân"
                        description="3 ca nhiễm mới"/>
                <Marker coordinate={{latitude:21.0358791, longitude:105.8121224}}
                        title="Q. Ba Đình"
                        description="29 ca nhiễm mới"/>
                <Marker coordinate={{latitude:21.0286782, longitude:105.7734043}}
                        title="Q. Cầu Giấy"
                        description="7 ca nhiễm mới"/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});