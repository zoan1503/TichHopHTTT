import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let today = new Date()
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
            const id = await AsyncStorage.getItem('id')
            // Axios.post('http://192.168.16.101:8000/signin/addlocation', {
            //     id: id,
            //     lat: location.coords.latitude,
            //     lon: location.coords.longitude,
            //     time: today,
            // })
            //console.log(location?.coords?.latitude)
        })();

    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    let lat = 21.003889
    let long = 105.836111

    if (text != 'Waiting..') {
        lat = location.coords.latitude
        long = location.coords.longitude
    }
    //console.log(lat)
    function pushLocation() {
        // Axios.post('http://192.168.16.101:8000/signin/addlocation', {
        //     id: 1,
        //     lat: lat,
        //     lon: long,
        //     time: today,
        // })
        //     .then(function (response) {
        //     })
    }
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
                <Marker coordinate={{ latitude: lat, longitude: long }}
                    title="Vị trí hiện tại"
                    onSelect={() => { pushLocation() }}
                    pinColor='blue'
                />
                <Marker coordinate={{ latitude: 20.974852, longitude: 105.822919 }}
                    title="Q. Hoàng Mai"
                    description="15 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.006944, longitude: 105.854167 }}
                    title="Q. Hai Bà Trưng"
                    description="42 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.007222, longitude: 105.830556 }}
                    title="Q. Đống Đa"
                    description="53 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 20.993445, longitude: 105.798454 }}
                    title="Q. Thanh Xuân"
                    description="3 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.0358791, longitude: 105.8121224 }}
                    title="Q. Ba Đình"
                    description="29 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.0286782, longitude: 105.7734043 }}
                    title="Q. Cầu Giấy"
                    description="7 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.028889, longitude: 105.8525 }}
                    title="Q. Hoàn Kiếm"
                    description="15 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 20.964944, longitude: 105.770694 }}
                    title="Q. Hà Đông"
                    description="16 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.004167, longitude: 105.969444 }}
                    title="Q. Long Biên"
                    description="19 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.070705, longitude: 105.811831 }}
                    title="Q. Tây Hồ"
                    description="26 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.054167, longitude: 105.682222 }}
                    title="Q. Bắc Từ Liêm"
                    description="34 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.003333, longitude: 105.703889 }}
                    title="Q. Nam Từ Liêm"
                    description="37 ca nhiễm mới" />

                {/* Vĩnh Phúc */}

                <Marker coordinate={{ latitude: 21.2352, longitude: 105.5748 }}
                    title="Huyện Yên Lạc"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.311944, longitude: 105.654722 }}
                    title="Huyện Bình Xuyên"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.418871, longitude: 105.406025 }}
                    title="Huyện Sông Lô"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.383056, longitude: 105.541111 }}
                    title="Huyện Tam Dương"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.393611, longitude: 105.616667 }}
                    title="Huyện Tam Đảo"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.443611, longitude: 105.473056 }}
                    title="Huyện Lập Thạch"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.221944, longitude: 105.505278 }}
                    title="Huyện Vĩnh Tường"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.312424, longitude: 105.596017 }}
                    title="Thành phố Vĩnh Yên"
                    description="37 ca nhiễm mới" />
                <Marker coordinate={{ latitude: 21.238889, longitude: 105.705 }}
                    title="Thành phố Phúc Yên"
                    description="37 ca nhiễm mới" />
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
