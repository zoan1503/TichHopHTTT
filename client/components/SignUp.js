import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, TextInput } from "react-native-paper";
import CustomCheckbox from "../common-component/CustomRadioCheckbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUp = ({ }) => {
    const navigation = useNavigation();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [fullname, setfullname] = useState('');
    const [birth, setbirth] = useState('');
    const [gender, setgender] = useState('');
    const [cccd, setcccd] = useState('');
    const [address, setaddress] = useState('');
    async function handleSubmit() {
        await Axios.post('http://192.168.16.101:8000/signup/add', {
            username: username,
            password: password,
            fullname: fullname,
            birth: birth,
            gender: gender,
            cccd: cccd,
            address: address
        })
            .then(function (response) {
                Alert.alert('Done', 'Đăng ký thành công', [{ text: "Đăng nhập ngay", onPress: () => navigation.navigate("Login") }])
            })
    }
    return (
        <ScrollView>
            <View style={{ alignSelf: "center", marginTop: 20 }}>
                <Image
                    style={styles.avatar}
                    source={require("../assets/default-avatar.png")}
                />
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <View>
                    <Text>Tài khoản / Username *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setusername(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Mật khẩu / Password *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setpassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Họ và tên / Fullname *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setfullname(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Sinh nhật / Birthday *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setbirth(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Giới tính / Gender *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setgender(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Số CCCD / ID Card *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setcccd(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Địa Chỉ / Address *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setaddress(text)}
                    />
                    {/* <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: 35,
                            right: 10,
                            height: 30,
                            width: 30,
                        }}
                    >
                        <MaterialIcons size={38} name="arrow-drop-down" />
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity
                    style={{ marginTop: 20, alignSelf: "center" }}
                    onPress={() => { handleSubmit() }}>
                    <Text style={{ fontSize: 18, color: '#000' }}>Đăng ký / Signup</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text></Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 120,
        height: 120,
    },
});

export default SignUp;

