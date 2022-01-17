import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, TextInput } from "react-native-paper";
import CustomCheckbox from "../common-component/CustomRadioCheckbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eng from '../Language/eng.json'
import vie from '../Language/vie.json'

const InitialScreen = ({ }) => {
  const [text, setText] = React.useState("Em Quang óc chó");
  const [checked, setChecked] = React.useState(false);
  const [user, setUser] = useState({});
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
      Axios
        .get("http://192.168.16.101:8000/signin/getalluserinfo", {
          params: {
            'id': id
          }
        })
        .then(function (response) {
          setUser(response.data[0]);
        });
    } catch (err) {
      console.log(err)
    }
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
          <Text>{langu.fullname} *</Text>
          <TextInput
            mode="outlined"
            value={user.fullname}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>{langu.birth} *</Text>
          <TextInput
            mode="outlined"
            value={changedate(user.birth)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>{langu.gender} *</Text>
          <TextInput
            mode="outlined"
            value={user.gender == 1 ? "Nam" : "Nữ"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>{langu.idcard} *</Text>
          <TextInput
            mode="outlined"
            value={user.cccd}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>{langu.address} *</Text>
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
