import React, {Component} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput} from 'react-native';

class LogIn extends Component {
 render() {
    return (
      <View style={styles.container}>
      <Text style={styles.content} >Lập nhóm đi ăn</Text>
      <TouchableOpacity
        style={styles.submit}
        onPress={() => { this.props.navigation.navigate('CustomerLogin') }}
      >

        <Text style={{ fontSize: 18, color: '#fff' }}>Đăng nhập cho khách hàng</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.submit}
        onPress={() => { this.props.navigation.navigate('RestaurantLogin') }}
      >

        <Text style={{ fontSize: 18, color: '#fff' }}>Đăng nhập cho nhà hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => { this.props.navigation.navigate('CustomerSignUp') }}
        >
        <Text style={{ fontSize: 14, color: '#fff' }}>Đăng kí tài khoản khách hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signup2}
        onPress={() => { this.props.navigation.navigate('RestaurantSignUp') }}
        >
        <Text style={{ fontSize: 14, color: '#fff' }}>Đăng kí tài khoản nhà hàng</Text>
      </TouchableOpacity>
      <Text>
    </Text>
    </View>
    )
  }
}


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
     backgroundColor: '#008000' ,
     width:'90%',
    height:40,
    borderRadius:5,
    alignItems:'center',
    marginTop:7,
    justifyContent:'center',
  },
  signup:{
     backgroundColor: '#326' ,
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
export default LogIn;
