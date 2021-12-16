import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, TextInput } from "react-native-paper";
import CustomCheckbox from "../common-component/CustomRadioCheckbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const InitialScreen = ({}) => {
  const [text, setText] = React.useState("Em Quang óc chó");
  const [checked, setChecked] = React.useState(false);
  const handleChecked = () => {
    setChecked(!checked);
  };
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
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Ngày tháng năm sinh *</Text>
          <TextInput
            mode="outlined"
            value={"19/04/1999s"}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
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
            <CustomCheckbox
              label="Khác"
              checked={checked}
              onChecked={handleChecked}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Số điện thoại *</Text>
          <TextInput
            mode="outlined"
            value={"0855451999"}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Tỉnh/Thành phố *</Text>
          <TextInput
            mode="outlined"
            value={"Thành phố Hà Nội"}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 35,
              right: 10,
              height: 30,
              width: 30,
            }}
          >
            <MaterialIcons size={38} name="arrow-drop-down" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Quận/Huyện *</Text>
          <TextInput
            mode="outlined"
            value={"0855451999"}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 35,
              right: 10,
              height: 30,
              width: 30,
            }}
          >
            <MaterialIcons size={38} name="arrow-drop-down" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Phường/Xã *</Text>
          <TextInput
            mode="outlined"
            value={"0855451999"}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 35,
              right: 10,
              height: 30,
              width: 30,
            }}
          >
            <MaterialIcons size={38} name="arrow-drop-down" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Fôter</Text>
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
