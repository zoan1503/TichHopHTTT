import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAweSome from 'react-native-vector-icons/FontAwesome'
const CustomCheckbox = ({ label, checked, onChecked }) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", marginRight: 15 }}  onPress={onChecked}>
      <View style={styles.body}>
          {checked && (
              <FontAweSome color={'#037ffc'} name='circle' size={20} />
          )}
      </View>
      <Text style={{marginLeft: 5, alignSelf: 'flex-end', fontSize: 18}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    borderRadius: 15,
    width: 25,
    height: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#037ffc',
    paddingLeft: 1
  },
});

export default CustomCheckbox;
