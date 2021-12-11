import React, {Component} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput,Button,Image} from 'react-native';
import {useState} from "react";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';

class CustomerSignUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name:'',
            account:'',
            password:'',
            repassword:'',
            birthday:'',
            address:'',
            avatar:'',
            imagename:'',
            imagetype:'',
            check:'',
            namewarn:'Không được để trống',
            addresswarn:'Không được để trống',
            accountwarn:'Tối thiểu 6 kí tự, tối đa 20 kí tự',
            passwarn:'Tối thiểu 6 kí tự, tối đa 20 kí tự',
            repasswarn:'Chưa khớp với mật khẩu'
        }
    }



    render() {

        var uploadImageasync =  async () => {

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false, // higher res on iOS
                aspect: [4, 3],
            });

            if (result.cancelled) {
                return;
            }

            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = 'image/jpg';
            this.setState({'avatar': localUri, 'imagename':filename,'imagetype':type});
        };

        var CheckName = (text) => {
            if(text.length > 0) this.setState({namewarn:''});
            else this.setState({namewarn:'Không được để trống'});
        }

        var CheckAddress = (text) => {
            if(text.length > 0) this.setState({addresswarn:''});
            else this.setState({addresswarn:'Không được để trống'});
        }

        var CheckAccount = (text) => {
            if(text.length >= 6 && text.length <= 20) this.setState({accountwarn:''});
            else this.setState({accountwarn:'Tối thiểu 6 kí tự, tối đa 20 kí tự'});
        }

        var CheckPass = (text) => {
            if(text.length >= 6 && text.length <= 20) this.setState({passwarn:''});
            else this.setState({passwarn:'Tối thiểu 6 kí tự, tối đa 20 kí tự'});
            if(this.state.repassword == text) this.setState({repasswarn:''});
            else  this.setState({repasswarn:'Chưa khớp với mật khẩu'});
        }

        var CheckRePass = (text) => {
            if(text == this.state.password) this.setState({repasswarn:''});
            else  this.setState({repasswarn:'Chưa khớp với mật khẩu'});
        }

        var CheckSignUp = () => {
            if(this.state.name.length==0 || this.state.address.length==0 || this.state.account.length < 6 || this.state.account.length > 20 || this.state.password.length <6
                || this.state.password.length > 20 || this.state.password != this.state.repassword){
                this.setState({check:'Thông tin vừa nhập không hợp lệ'});
                return;
            }
            let formdata = new FormData();
            formdata.append("name", this.state.name);
            formdata.append("birthday", this.state.birthday);
            formdata.append("address", this.state.address);
            formdata.append("roleCode", 1);
            formdata.append("avatar", {uri:this.state.avatar, name: this.state.imagename, type: this.state.imagetype});
            formdata.append("isActive", 1);
            formdata.append("account", this.state.account);
            formdata.append("password", this.state.password);

            const signup = async () => {
              await fetch('https://eat-with-friend.herokuapp.com/v1/customer/createone',

                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formdata
                }).then((response) => response.json()).then((json) => {
                  console.log(json);
                if(json.error==200){
                    alert('Đăng kí tài khoản thành công');
                    this.props.navigation.navigate('CustomerLogin');
                }
                else{
                    if(json.error==1000)
                    alert('Tài khoản đã tồn tại');
                }
                
              });
            };
            signup();
        };
        return (
            <View style={styles.container}>
                <Text style={styles.content} >Đăng kí tài khoản khách hàng</Text>
                <TextInput placeholder='Họ và tên'
                           style={styles.username}
                           onChangeText={(text) => {
                               this.setState({ name: text });
                               CheckName(text);
                           }}
                />
                <Text style={styles.warning}>{this.state.namewarn}</Text>
                <TextInput placeholder='Địa chỉ'
                           style={styles.username}
                           onChangeText={(text) => {
                               this.setState({ address: text });
                               CheckAddress(text);
                           }
                           }
                />
                <Text style={styles.warning}>{this.state.addresswarn}</Text>
                <TextInput placeholder='Tên tài khoản'
                           style={styles.username}
                           onChangeText={(text) => {
                               this.setState({ account: text });
                               CheckAccount(text);
                           }
                           }
                />
                <Text style={styles.warning}>{this.state.accountwarn}</Text>
                <TextInput placeholder='Mật khẩu'
                           secureTextEntry={true}
                           style={styles.username}
                           onChangeText={(text) => {
                               this.setState({ password: text });
                               CheckPass(text);
                           }
                           }
                />
                <Text style={styles.warning}>{this.state.passwarn}</Text>
                <TextInput placeholder='Nhập lại mật khẩu'
                           secureTextEntry={true}
                           style={styles.username}
                           onChangeText={(text) => {
                               this.setState({ repassword: text });
                               CheckRePass(text);
                           }
                           }
                />
                <Text style={styles.warning}>{this.state.repasswarn}</Text>
                <View style={{flexDirection:'row'}}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.birthday} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Ngày sinh"
                        format="DD-MM-YYYY"
                        maxDate={new Date().getDate()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({birthday:date});
                        }}
                    />
                    <Button
                        title='Ảnh đại diện'
                        style={styles.username}
                        onPress = {()=> {uploadImageasync()}}
                    />
                </View>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => { CheckSignUp() }}
                >

                    <Text style={{ fontSize: 18, color: '#fff' }}>Đăng kí</Text>
                </TouchableOpacity>
                <Text style={{color:'red'}}>{this.state.check}</Text>
                <Text>
                </Text>
            </View>
        )
    }
}

export default CustomerSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        color: '#008000',
        fontWeight:'bold',
        fontSize:20
    },
    username:{
        backgroundColor:'#fff',
        padding: 10,
        margin: 5,
        width:'90%',
        height:42,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'gray'
    },submit:{
        backgroundColor: '#326' ,
        width:'90%',
        height:40,
        borderRadius:5,
        alignItems:'center',
        marginTop:7,
        justifyContent:'center',
    },signup:{
        backgroundColor: '#008000' ,
        width:'90%',
        height:30,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    },
    warning:{
        color:'red',
        fontSize: 13,
    }
});