import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    useEffect(() => {
        Axios
            .get("http://192.168.16.101:8000/signin/getalluserinfo", {
                params: {
                    'id': 4
                }
            })
            .then(response => setUser(response.data[0]));
    }, []);
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.stretch}
                        source={require("../assets/a.jpg")}
                    />
                    <View style={styles.userInfo}>
                        <Text style={{ fontSize: 20 }}>Xin chào</Text>
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
                <View style={styles.mainFunc}>
                    <LinearGradient
                        colors={['#00C1FF', '#2524FF']}

                        style={{ borderRadius: 15 }}
                    >
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
                                    Test thông tin cá nhân
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#9AEB0C', '#24CF5F']}
                        style={{ borderRadius: 15 }}
                    >
                        <TouchableOpacity style={styles.second} onPress={() => { navigation.navigate("Certificate") }}>
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
                                    Chứng nhận ngừa Covid
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FF3359', '#FF7A2D']}

                        style={{ borderRadius: 15 }}
                    >
                        <TouchableOpacity style={styles.third} onPress={() => { navigation.navigate("SignUp") }}>
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
                                    Test đăng ký
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={styles.footer}>
                    <View
                        style={{
                            marginTop: 15,
                            marginHorizontal: 35,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon} onPress={() => { navigation.navigate("Login") }}>
                                <Entypo name="clock" size={45} color="blue" />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                            >
                                Test đăng nhập
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 110,
                            }}
                        >
                            <TouchableOpacity style={styles.backgroundIcon}>
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
                                Đăng ký tiêm chủng
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
                                Test chức năng Map
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
        marginTop: 20,
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
    footer: {
        backgroundColor: "#c2fffb",
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
        elevation: 0,
        backgroundColor: "#fff",
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default HomeScreen;