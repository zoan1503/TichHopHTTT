import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, TextInput } from "react-native-paper";
import CustomCheckbox from "../common-component/CustomRadioCheckbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialScreen = ({ }) => {
  const [text, setText] = React.useState("Em Quang óc chó");
  const [checked, setChecked] = React.useState(false);
  const [user, setUser] = useState({});
  // let id = 0
  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('id');
  //     if (value !== null) {
  //       // We have data!!
  //       id = value
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  //let id = AsyncStorage.getItem('id')
  useEffect(() => {
    Axios
      .get("http://192.168.16.101:8000/signin/getalluserinfo", {
        params: {
          'id': 4
        }
      })
      .then(response => setUser(response.data[0]));
  }, []);
  function changedate(date) {
    if (typeof date !== 'undefined') {
      let ndate = date.substring(0, 10)
      let result = ndate.substring(8, 10) + '/' + ndate.substring(5, 7) + '/' + ndate.substring(0, 4)
      return result
    }
    else
      return date;
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
          <Text>Họ và tên *</Text>
          <TextInput
            mode="outlined"
            value={user.fullname}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Ngày tháng năm sinh *</Text>
          <TextInput
            mode="outlined"
            value={changedate(user.birth)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Giới tính *</Text>
          <TextInput
            mode="outlined"
            value={user.gender == 1 ? "Nam" : "Nữ"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Số CMND / CCCD *</Text>
          <TextInput
            mode="outlined"
            value={user.cccd}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Địa chỉ *</Text>
          <TextInput
            mode="outlined"
            value={user.address}
          />
        </View>

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

export default InitialScreen;
