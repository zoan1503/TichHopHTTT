import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eng from '../Language/eng.json'
import vie from '../Language/vie.json'
const Move = ({ }) => {
  const [allLocation, setallLocation] = useState([]);
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
  let address = [
    "Quận Hoàng Mai",
    "Quận Hai Bà Trưng",
    "Quận Đống Đa",
    "Quận Thanh Xuân",
    "Quận Ba Đình",
    "Quận Cầu Giấy",
    "Quận Hoàn Kiếm",
    "Quận Hà Đông",
    "Quận Long Biên",
    "Quận Tây Hồ",
    "Quận Bắc Từ Liêm",
    "Quận Nam Từ Liêm",
    "Huyện Yên Lạc",
    "Huyện Bình Xuyên",
    "Huyện Sông Lô",
    "Huyện Tam Dương",
    "Huyện Tam Đảo",
    "Huyện Lập Thạch",
    "Huyện Vĩnh Tường",
    "Thành phố Vĩnh Yên",
    "Thành phố Phúc Yên"
  ]
  let latlon = [
    [20.974852, 105.822919],
    [21.006944, 105.854167],
    [21.007222, 105.830556],
    [20.993445, 105.798454],
    [21.0358791, 105.8121224],
    [21.0286782, 105.7734043],
    [21.028889, 105.8525],
    [20.964944, 105.770694],
    [21.004167, 105.969444],
    [21.070705, 105.811831],
    [21.054167, 105.682222],
    [21.003333, 105.703889],
    [21.2352, 105.5748],
    [21.311944, 105.654722],
    [21.418871, 105.406025],
    [21.383056, 105.541111],
    [21.393611, 105.616667],
    [21.443611, 105.473056],
    [21.221944, 105.505278],
    [21.312424, 105.596017],
    [21.238889, 105.705]
  ]
  function nearest(lat, lon) {
    var minn = 999.0;
    var pos = 0;
    for (var i = 0; i < latlon.length; i++) {
      var distance = (lat - latlon[i][0]) * (lat - latlon[i][0]) + (lon - latlon[i][1]) * (lon - latlon[i][1]);
      if (distance < minn) {
        pos = i;
        minn = distance;
      }
    }
    return pos
  }
  function fixtime(time) {
    var day = time.substring(8, 10)
    var month = time.substring(5, 7)
    var year = time.substring(0, 4)
    return day + '-' + month + '-' + year
  }

  useEffect(async () => {
    try {
      const id = await AsyncStorage.getItem('id')
      Axios
        .get("http://192.168.16.101:8000/signin/getlocation", {
          params: {
            'id': 1
          }
        })
        .then(
          function (response) {
            setallLocation(response.data);
          }
        );
    } catch (err) {
      console.log(err)
    }
  }, []);
  let lists = []
  let times = []
  let ids = []
  for (var i = 0; i < allLocation.length; i++) {
    lists.push(address[nearest(allLocation[i].lat, allLocation[i].lon)])
    times.push(fixtime(allLocation[i].time))
    ids.push(allLocation[i].id_location)
  }
  // var dataa = []
  // var quan = [
  //   "Quận Đống Đa",
  //   "Quận Thanh Xuân",
  //   "Quận Hoàng Mai",
  //   "Huyện Đông Anh",
  //   "Huyện Gia Lâm",
  //   "Quận Hai Bà Trưng",
  //   "Quận Nam Từ Liêm",
  //   "Quận Hà Đông",
  //   "Huyện Thanh Trì",
  //   "Quận Ba Đình",
  //   "Quận Bắc Từ Liêm",
  //   "Huyện Mê Linh",
  //   "Huyện Quốc Oai",
  //   "Quận Hoàn Kiếm",
  //   "Huyện Thường Tín",
  //   "Huyện Chương Mỹ",
  //   "Huyện Hoài Đức",
  //   "Quận Long Biên",
  //   "Quận Cầu Giấy",
  //   "Quận Tây Hồ",
  //   "Huyện Thanh Oai",
  //   "Huyện Sóc Sơn",
  //   "Huyện Thạch Thất",
  //   "Huyện Đan Phượng",
  //   "Huyện Phú Xuyên",
  //   "Huyện Mỹ Đức",
  //   "Thị xã Sơn Tây",
  //   "Huyện Ba Vì",
  //   "Huyện Ứng Hòa",
  //   "Huyện Phúc Thọ",
  // ]

  var dataa = []
  for (var i = allLocation.length - 1; i >= 0; i--) {
    var b = { 'id': ids[i], 'quan': lists[i], 'time': times[i] }
    dataa.push(b)
  }
  return (
    <View style={styles.body}>
      <View style={styles.list}>
        <Text style={styles.row}>ID</Text>
        <Text style={styles.row2}>{langu.place}</Text>
        <Text style={styles.row3}>{langu.time}</Text>
      </View>
      <FlatList
        data={dataa}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <View style={styles.list} >
            <Text style={styles.row}>{item.id}</Text>
            <Text style={styles.row2}>{item.quan}</Text>
            <Text style={styles.row3}>{item.time}</Text>
          </View>}>
      </FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: .5,
    marginLeft: 5,
  },
  row: {
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    textAlign: 'center',
  },
  row2: {
    backgroundColor: '#fff',
    flex: 2,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    textAlign: 'center'
  },
  row3: {
    backgroundColor: '#fff',
    flex: 2,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    textAlign: 'center'
  }
})
export default Move