import React, {Component} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput} from 'react-native';
import {useState} from "react";
import axios from "axios";

class CustomerLogin extends Component {
    constructor (props) {
        super(props)
        this.state = {
            account:'',
            password:'',
            check:''
        }
    }



    render() {

        var Checklogin = () => {
            let formdata = new FormData();
            formdata.append("account", this.state.account);
            formdata.append("password", this.state.password);
            fetch('https://eat-with-friend.herokuapp.com/v1/account/signin',

                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formdata
                }).then((response) => response.json()).then((json) => {
                if(json.error==200){
                    this.props.navigation.navigate('Home',{user:json, acc: this.state.account, pwd: this.state.password});

                }
                else{
                    this.setState({check: 'Tên tài khoản hoặc mật khẩu không đúng'});
                }
            });
        };

        return (
            <View style={styles.container}>
                <Text style={styles.content} >Lập nhóm đi ăn</Text>
                <TextInput placeholder='Tên tài khoản'
                           style={styles.username}
                           onChangeText={(text) => this.setState({ account: text })}
                />
                <TextInput placeholder='Mật khẩu'
                           secureTextEntry={true}
                           style={styles.username}
                           onChangeText={(text) => this.setState({ password: text })}
                />
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => { Checklogin() }}
                >

                    <Text style={{ fontSize: 18, color: '#fff' }}>Đăng nhập</Text>
                </TouchableOpacity>
                <Text style={{color:'red',fontWeight:'bold'}}>{this.state.check}</Text>
                <Text>
                </Text>
            </View>
        )
    }
}

export default CustomerLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        color: '#008000',
        fontWeight:'bold',
        fontSize:45
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
    },
    signup:{
        backgroundColor: '#008000' ,
        width:'90%',
        height:30,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    },
    signup2:{
        backgroundColor: '#326' ,
        width:'90%',
        height:30,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    }
});