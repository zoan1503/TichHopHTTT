import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, TextInput } from "react-native-paper";
import CustomCheckbox from "../common-component/CustomRadioCheckbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Login = ({ }) => {
    const navigation = useNavigation();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [info, setinfo] = useState({});
    async function handleSubmit() {
        await Axios.get('http://192.168.16.101:8000/signin/checksignin', {
            params: {
                'username': username,
                'password': password
            }
        })
            .then(response => {
                if (response.data.length == 0) {
                    Alert.alert('Fail', 'Tài khoản hoặc mật khẩu không chính xác', [{ text: "Quay lại", onPress: () => console.log('Failed') }])
                }
                else {
                    // localStorage.setItem({'id_user': response.data[0].id_user}, {'isLogged' : 1} )
                    try {
                        setinfo(response.data[0])
                        AsyncStorage.setItem('id', JSON.stringify(response.data[0].id))
                        AsyncStorage.setItem('isLoggedd', JSON.stringify(true))
                    } catch (err) {
                        console.log(err)
                    }
                    navigation.navigate("Home")
                }
            });
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
                    <Text>Tên đăng nhập *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setusername(text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Mật khẩu *</Text>
                    <TextInput
                        mode="outlined"
                        onChangeText={(text) => setpassword(text)}
                        secureTextEntry={true} 
                    />

                    {/* <View style={{ marginTop: 20 }}>
                    <Text style={{ marginBottom: 5 }}>Giới tính *</Text>
                    <View style={{ flexDirection: "row" }}>
                        <CustomCheckbox
                            label="Nam"
                            checked={checked}
                            onChecked={handleChecked}
                        />
                        <CustomCheckbox
                            label="Nữ"
                            checked={checked}
                            onChecked={handleChecked}
                        />
                    </View>
                </View> */}


                </View>
                <TouchableOpacity
                    style={{ marginTop: 20, alignSelf: "center" }}
                    onPress={() => { handleSubmit() }}>
                    <Text style={{ fontSize: 18, color: '#000' }}>Đăng nhập</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 20, alignSelf: "center" }}>
                    Chưa có tài khoản?
                </Text>
                <TouchableOpacity
                    style={{ marginTop: 20, alignSelf: "center" }}
                    onPress={() => { handleSubmit() }}>
                    <Text style={{ fontSize: 18, color: '#000' }} onPress={() => { navigation.navigate("SignUp") }}>Đăng ký</Text>
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

export default Login;

// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image } from 'react-native';
// import { useState } from "react";
// import axios from "axios";
// import * as ImagePicker from 'expo-image-picker';
// import DatePicker from 'react-native-datepicker';

// class SignUp extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             name: '',
//             account: '',
//             password: '',
//             repassword: '',
//             birthday: '',
//             address: '',
//             avatar: '',
//             imagename: '',
//             imagetype: '',
//             check: '',
//             namewarn: 'Không được để trống',
//             addresswarn: 'Không được để trống',
//             accountwarn: 'Tối thiểu 6 kí tự, tối đa 20 kí tự',
//             passwarn: 'Tối thiểu 6 kí tự, tối đa 20 kí tự',
//             repasswarn: 'Chưa khớp với mật khẩu'
//         }
//     }



//     render() {

//         var uploadImageasync = async () => {

//             let result = await ImagePicker.launchImageLibraryAsync({
//                 allowsEditing: false, // higher res on iOS
//                 aspect: [4, 3],
//             });

//             if (result.cancelled) {
//                 return;
//             }

//             let localUri = result.uri;
//             let filename = localUri.split('/').pop();

//             let match = /\.(\w+)$/.exec(filename);
//             let type = 'image/jpg';
//             this.setState({ 'avatar': localUri, 'imagename': filename, 'imagetype': type });
//         };

//         var CheckName = (text) => {
//             if (text.length > 0) this.setState({ namewarn: '' });
//             else this.setState({ namewarn: 'Không được để trống' });
//         }

//         var CheckAddress = (text) => {
//             if (text.length > 0) this.setState({ addresswarn: '' });
//             else this.setState({ addresswarn: 'Không được để trống' });
//         }

//         var CheckAccount = (text) => {
//             if (text.length >= 6 && text.length <= 20) this.setState({ accountwarn: '' });
//             else this.setState({ accountwarn: 'Tối thiểu 6 kí tự, tối đa 20 kí tự' });
//         }

//         var CheckPass = (text) => {
//             if (text.length >= 6 && text.length <= 20) this.setState({ passwarn: '' });
//             else this.setState({ passwarn: 'Tối thiểu 6 kí tự, tối đa 20 kí tự' });
//             if (this.state.repassword == text) this.setState({ repasswarn: '' });
//             else this.setState({ repasswarn: 'Chưa khớp với mật khẩu' });
//         }

//         var CheckRePass = (text) => {
//             if (text == this.state.password) this.setState({ repasswarn: '' });
//             else this.setState({ repasswarn: 'Chưa khớp với mật khẩu' });
//         }

//         var CheckSignUp = () => {
//             if (this.state.name.length == 0 || this.state.address.length == 0 || this.state.account.length < 6 || this.state.account.length > 20 || this.state.password.length < 6
//                 || this.state.password.length > 20 || this.state.password != this.state.repassword) {
//                 this.setState({ check: 'Thông tin vừa nhập không hợp lệ' });
//                 return;
//             }
//             let formdata = new FormData();
//             formdata.append("name", this.state.name);
//             formdata.append("birthday", this.state.birthday);
//             formdata.append("address", this.state.address);
//             formdata.append("roleCode", 1);
//             formdata.append("avatar", { uri: this.state.avatar, name: this.state.imagename, type: this.state.imagetype });
//             formdata.append("isActive", 1);
//             formdata.append("account", this.state.account);
//             formdata.append("password", this.state.password);

//             const signup = async () => {
//                 await fetch('https://eat-with-friend.herokuapp.com/v1/customer/createone',

//                     {
//                         method: 'put',
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                         body: formdata
//                     }).then((response) => response.json()).then((json) => {
//                         console.log(json);
//                         if (json.error == 200) {
//                             alert('Đăng kí tài khoản thành công');
//                             this.props.navigation.navigate('CustomerLogin');
//                         }
//                         else {
//                             if (json.error == 1000)
//                                 alert('Tài khoản đã tồn tại');
//                         }

//                     });
//             };
//             signup();
//         };
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.content} >Đăng kí tài khoản khách hàng</Text>
//                 <TextInput placeholder='Họ và tên'
//                     style={styles.username}
//                     onChangeText={(text) => {
//                         this.setState({ name: text });
//                         CheckName(text);
//                     }}
//                 />
//                 <Text style={styles.warning}>{this.state.namewarn}</Text>
//                 <TextInput placeholder='Địa chỉ'
//                     style={styles.username}
//                     onChangeText={(text) => {
//                         this.setState({ address: text });
//                         CheckAddress(text);
//                     }
//                     }
//                 />
//                 <Text style={styles.warning}>{this.state.addresswarn}</Text>
//                 <TextInput placeholder='Tên tài khoản'
//                     style={styles.username}
//                     onChangeText={(text) => {
//                         this.setState({ account: text });
//                         CheckAccount(text);
//                     }
//                     }
//                 />
//                 <Text style={styles.warning}>{this.state.accountwarn}</Text>
//                 <TextInput placeholder='Mật khẩu'
//                     secureTextEntry={true}
//                     style={styles.username}
//                     onChangeText={(text) => {
//                         this.setState({ password: text });
//                         CheckPass(text);
//                     }
//                     }
//                 />
//                 <Text style={styles.warning}>{this.state.passwarn}</Text>
//                 <TextInput placeholder='Nhập lại mật khẩu'
//                     secureTextEntry={true}
//                     style={styles.username}
//                     onChangeText={(text) => {
//                         this.setState({ repassword: text });
//                         CheckRePass(text);
//                     }
//                     }
//                 />
//                 <Text style={styles.warning}>{this.state.repasswarn}</Text>
//                 <View style={{ flexDirection: 'row' }}>
//                     <DatePicker
//                         style={styles.datePickerStyle}
//                         date={this.state.birthday} // Initial date from state
//                         mode="date" // The enum of date, datetime and time
//                         placeholder="Ngày sinh"
//                         format="DD-MM-YYYY"
//                         maxDate={new Date().getDate()}
//                         confirmBtnText="Confirm"
//                         cancelBtnText="Cancel"
//                         customStyles={{
//                             dateIcon: {
//                                 //display: 'none',
//                                 position: 'absolute',
//                                 left: 0,
//                                 top: 4,
//                                 marginLeft: 0,
//                             },
//                             dateInput: {
//                                 marginLeft: 36,
//                             },
//                         }}
//                         onDateChange={(date) => {
//                             this.setState({ birthday: date });
//                         }}
//                     />
//                     <Button
//                         title='Ảnh đại diện'
//                         style={styles.username}
//                         onPress={() => { uploadImageasync() }}
//                     />
//                 </View>
//                 <TouchableOpacity
//                     style={styles.submit}
//                     onPress={() => { CheckSignUp() }}
//                 >

//                     <Text style={{ fontSize: 18, color: '#fff' }}>Đăng kí</Text>
//                 </TouchableOpacity>
//                 <Text style={{ color: 'red' }}>{this.state.check}</Text>
//                 <Text>
//                 </Text>
//             </View>
//         )
//     }
// }

// export default SignUp;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     content: {
//         color: '#008000',
//         fontWeight: 'bold',
//         fontSize: 20
//     },
//     username: {
//         backgroundColor: '#fff',
//         padding: 10,
//         margin: 5,
//         width: '90%',
//         height: 42,
//         borderRadius: 5,
//         borderWidth: 0.5,
//         borderColor: 'gray'
//     }, submit: {
//         backgroundColor: '#326',
//         width: '90%',
//         height: 40,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 7,
//         justifyContent: 'center',
//     }, signup: {
//         backgroundColor: '#008000',
//         width: '90%',
//         height: 30,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 15
//     },
//     warning: {
//         color: 'red',
//         fontSize: 13,
//     }
// });
// import React, {Component} from 'react';
// import { StyleSheet, Text, View ,TouchableOpacity, TextInput} from 'react-native';
// import {useState} from "react";
// import axios from "axios";

// class CustomerLogin extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             account:'',
//             password:'',
//             check:''
//         }
//     }



//     render() {

//         var Checklogin = () => {
//             let formdata = new FormData();
//             formdata.append("account", this.state.account);
//             formdata.append("password", this.state.password);
//             fetch('https://eat-with-friend.herokuapp.com/v1/account/signin',

//                 {
//                     method: 'post',
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                     body:formdata
//                 }).then((response) => response.json()).then((json) => {
//                 if(json.error==200){
//                     this.props.navigation.navigate('Home',{user:json, acc: this.state.account, pwd: this.state.password});

//                 }
//                 else{
//                     this.setState({check: 'Tên tài khoản hoặc mật khẩu không đúng'});
//                 }
//             });
//         };

//         return (
//             <View style={styles.container}>
//                 <Text style={styles.content} >Lập nhóm đi ăn</Text>
//                 <TextInput placeholder='Tên tài khoản'
//                            style={styles.username}
//                            onChangeText={(text) => this.setState({ account: text })}
//                 />
//                 <TextInput placeholder='Mật khẩu'
//                            secureTextEntry={true}
//                            style={styles.username}
//                            onChangeText={(text) => this.setState({ password: text })}
//                 />
//                 <TouchableOpacity
//                     style={styles.submit}
//                     onPress={() => { Checklogin() }}
//                 >

//                     <Text style={{ fontSize: 18, color: '#fff' }}>Đăng nhập</Text>
//                 </TouchableOpacity>
//                 <Text style={{color:'red',fontWeight:'bold'}}>{this.state.check}</Text>
//                 <Text>
//                 </Text>
//             </View>
//         )
//     }
// }

// export default CustomerLogin;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     content:{
//         color: '#008000',
//         fontWeight:'bold',
//         fontSize:45
//     },
//     username:{
//         backgroundColor:'#fff',
//         padding: 10,
//         margin: 5,
//         width:'90%',
//         height:42,
//         borderRadius:5,
//         borderWidth:0.5,
//         borderColor:'gray'
//     },submit:{
//         backgroundColor: '#326' ,
//         width:'90%',
//         height:40,
//         borderRadius:5,
//         alignItems:'center',
//         marginTop:7,
//         justifyContent:'center',
//     },
//     signup:{
//         backgroundColor: '#008000' ,
//         width:'90%',
//         height:30,
//         borderRadius:5,
//         alignItems:'center',
//         justifyContent:'center',
//         marginTop:15
//     },
//     signup2:{
//         backgroundColor: '#326' ,
//         width:'90%',
//         height:30,
//         borderRadius:5,
//         alignItems:'center',
//         justifyContent:'center',
//         marginTop:15
//     }
// });