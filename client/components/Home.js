import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert, Switch } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import eng from '../Language/eng.json'
import vie from '../Language/vie.json'


const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const [isEnable, setisEnable] = useState(true);
    const [textSwitch, settextSwitch] = useState('Tiếng Việt');
    const [langu, setlangu] = useState(vie)
    useEffect(async () => {
        try {
            const lg = await AsyncStorage.getItem('language')
            if (lg == 'vie') {
                setlangu(vie)
            } else {
                setlangu(eng)
            }
        } catch (err) {
            console.log(err)
        }
    }, []);
    useEffect(async () => {
        try {
            const id = await AsyncStorage.getItem('id')
            //const lg = await AsyncStorage.getItem('language')
            Axios
                .get("http://192.168.16.101:8000/signin/getalluserinfo", {
                    params: {
                        'id': id
                    }
                })
                .then(function (response) {
                    setUser(response.data[0]);
                });
            // if (lg == 'vie') {
            //     setlangu(vie)
            // } else {
            //     setlangu(eng)
            // }
        } catch (err) {
            console.log(err)
        }
    }, []);
    async function logout() {
        try {
            AsyncStorage.setItem('id', JSON.stringify(0))
            AsyncStorage.setItem('isLoggedd', JSON.stringify(false))
            Alert.alert('Đăng xuất thành công', 'Trở lại trang đăng nhập', [{ text: "OK", onPress: () => navigation.navigate("Login") }])
            navigation.navigate("Login")
        } catch (err) {
            console.log(err)
        }
    }

    const toggleSwitch = () => {
        setisEnable(previousState => !previousState)
        Alert.alert('Thông báo', 'Đã thay đổi ngôn ngữ', [{ text: "OK", onPress: () => navigation.navigate("Home") }])
        if (isEnable != false) {
            try {
                settextSwitch('English')
                AsyncStorage.setItem('language', 'eng')
                setlangu(eng)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                settextSwitch('Tiếng Việt')
                AsyncStorage.setItem('language', 'vie')
                setlangu(vie)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.stretch}
                        source={require("../assets/default-avatar.png")}
                    />
                    <View style={styles.userInfo}>
                        <Text style={{ fontSize: 20 }}>{langu.hello}</Text>
                        <Text
                            style={{
                                fontSize: 25,
                                color: "black",
                                fontWeight: "500",
                            }}>
                            {user.fullname}
                        </Text>
                    </View>

                </View>
                <View style={{ marginLeft: 230, flexDirection: 'row' }}>
                    <Switch
                        style={{ marginTop: 7 }}
                        trackColor={{ false: 'gray' }}
                        thumbColor={isEnable ? '#f4f3f4' : '#f3f4f3'}
                        onValueChange={toggleSwitch}
                        value={isEnable}
                    />
                    <Text style={{ marginLeft: 10, marginTop: 13 }}>
                        {textSwitch}
                    </Text>
                </View>
                <View style={styles.mainFunc}>
                    <LinearGradient
                        colors={['#59bffb', '#2173ff']}
                        style={{ borderRadius: 15 }}>
                        <TouchableOpacity style={styles.first} onPress={() => { navigation.navigate("Initial") }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    borderWidth: 5,
                                    borderColor: "#24ffff",
                                    borderRadius: 30,
                                    marginTop: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="shield" size={30} />
                            </View>
                            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 12,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    {langu.case}
                                </Text>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    16838
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#69efac', '#1dcebb']}
                        style={{ borderRadius: 15 }}>
                        <TouchableOpacity style={styles.second} onPress={() => { navigation.navigate("HaNoi") }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    borderWidth: 5,
                                    borderColor: "#24ffff",
                                    borderRadius: 30,
                                    marginTop: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="shield" size={30} />
                            </View>
                            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 12,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    {langu.recovery}
                                </Text>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    8692
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#fe928d', '#fe6c66']}

                        style={{ borderRadius: 15 }}
                    >
                        <TouchableOpacity style={styles.third} onPress={() => { navigation.navigate("VinhPhuc") }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    borderWidth: 5,
                                    borderColor: "#24ffff",
                                    borderRadius: 30,
                                    marginTop: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="shield" size={30} />
                            </View>
                            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 12,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    {langu.death}
                                </Text>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    184
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <View style={styles.footer}>
                    <LinearGradient
                        colors={['#EA4C46', '#EA4C46']}

                        style={{ borderRadius: 0 }}
                    >
                        <TouchableOpacity style={styles.fourth} onPress={() => { navigation.navigate("VinhPhuc") }}>
                            {/* <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    borderWidth: 5,
                                    borderColor: "#24ffff",
                                    borderRadius: 30,
                                    marginTop: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="shield" size={30} />
                            </View> */}
                            <View style={{ marginTop: 25 }}>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 12,
                                        textAlign: "center",
                                        fontWeight: "900",
                                    }}
                                >
                                    {langu.warning}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View
                        style={{
                            marginTop: 15,
                            marginHorizontal: 35,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: 25
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}>
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("HaNoi") }}>
                                <Entypo name="calculator" size={45} color="blue" />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.hanoi}
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("VinhPhuc") }}>
                                <MaterialCommunityIcons
                                    name="needle"
                                    size={45}
                                    color="blue"
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.vinhphuc}
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("Map") }}>
                                <Entypo
                                    name="map"
                                    size={45}
                                    color="blue"
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.location}
                            </Text>
                        </View>

                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            marginHorizontal: 35,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: 25
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("Initial") }}>
                                <Entypo name="info-with-circle" size={45} color="blue" />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.info}
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("Move") }}>
                                <MaterialCommunityIcons
                                    name="calendar"
                                    size={45}
                                    color="blue"
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.calendar}
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                                marginBottom: 20
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { logout() }}>
                                <Entypo
                                    name="log-out"
                                    size={45}
                                    color="blue"
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                {langu.logout}
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // flex: 1,
        // backgroundColor: '#fff'
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    stretch: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "blue",
    },
    userInfo: {
        marginLeft: 10,
    },
    mainFunc: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
    first: {
        width: width * 0.28,
        height: 150,
        // backgroundColor: "blue",
        borderRadius: 15,
        alignItems: "center",
    },
    second: {
        width: width * 0.28,
        height: 150,
        // backgroundColor: "#a8f299",
        borderRadius: 15,
        alignItems: "center",
    },
    third: {
        width: width * 0.28,
        height: 150,
        // backgroundColor: "red",
        borderRadius: 15,
        alignItems: "center",
    },
    fourth: {
        width: width * 1,
        height: 60,
        // backgroundColor: "blue",
        borderRadius: 0,
        alignItems: "center",
    },
    footer: {
        backgroundColor: "#eef1fa",
        alignSelf: "stretch",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 20,
        height: 500
    },
    backgroundIcon: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default HomeScreen;
