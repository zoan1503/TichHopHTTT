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
    const [hntoday, sethntoday] = useState({});
    const [hnyesterday, sethnyesterday] = useState({});
    const [vptoday, setvptoday] = useState({});
    const [vpyesterday, setvpyesterday] = useState([]);
    let today = new Date()
    let address = [
        "Quận Hoàng Mai",
        "Quận Hai Bà Trưng",
        "Quận Đống Đa",
        "Quận Thanh Xuân",
        "Quận Ba Đình",
        "Quận Cầu Giấy",
        "Quận Hoàn Kiếm",
        "Quận Hà Đông",
        "Quận Long Biên",
        "Quận Tây Hồ",
        "Quận Bắc Từ Liêm",
        "Quận Nam Từ Liêm",
        "Huyện Yên Lạc",
        "Huyện Bình Xuyên",
        "Huyện Sông Lô",
        "Huyện Tam Dương",
        "Huyện Tam Đảo",
        "Huyện Lập Thạch",
        "Huyện Vĩnh Tường",
        "Thành phố Vĩnh Yên",
        "Thành phố Phúc Yên"
    ]
    let latlon = [
        [20.974852, 105.822919],
        [21.006944, 105.854167],
        [21.007222, 105.830556],
        [20.993445, 105.798454],
        [21.0358791, 105.8121224],
        [21.0286782, 105.7734043],
        [21.028889, 105.8525],
        [20.964944, 105.770694],
        [21.004167, 105.969444],
        [21.070705, 105.811831],
        [21.054167, 105.682222],
        [21.003333, 105.703889],
        [21.2352, 105.5748],
        [21.311944, 105.654722],
        [21.418871, 105.406025],
        [21.383056, 105.541111],
        [21.393611, 105.616667],
        [21.443611, 105.473056],
        [21.221944, 105.505278],
        [21.312424, 105.596017],
        [21.238889, 105.705]
    ]
    useEffect(() => {
        Axios
            .get("http://192.168.16.101:8000/numcase/gethanoi", {})
            .then(
                function (response) {
                    sethntoday(response.data[response.data.length - 1]);
                    sethnyesterday(response.data[response.data.length - 6]);
                }
            );
    }, []);
    useEffect(() => {
        Axios
            .get("http://192.168.16.101:8000/numcase/getvinhphuc", {})
            .then(
                function (response) {
                    setvptoday(response.data[response.data.length - 1]);
                    setvpyesterday(response.data[response.data.length - 2]);
                }
            );
    }, []);
    var all = []

    if (typeof (hntoday.num) != 'undefined' && typeof (vptoday.num) != 'undefined') {
        all = { ...hntoday.num, ...vptoday.num }
    }
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
                {address && address.map(item => {
                    return (
                        <Marker coordinate={{ latitude: latlon[address.indexOf(item)][0], longitude: latlon[address.indexOf(item)][1] }}
                            title={item}
                            description={"Tổng " + all[`${item}`] + " ca nhiễm"}
                        />
                    )
                })}

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
