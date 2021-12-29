import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Axios from 'axios';
const HaNoi = ({ }) => {
    const [today, setToday] = useState({});
    const [yesterday, setYesterday] = useState({});

    useEffect(() => {
        Axios
            .get("http://192.168.16.101:8000/numcase/gethanoi", {})
            .then(
                function (response) {
                    setToday(response.data[response.data.length - 1]);
                    setYesterday(response.data[response.data.length - 6]);
                }
            );
    }, []);
    var dataa = []
    var quan = [
        "Quận Đống Đa",
        "Quận Thanh Xuân",
        "Quận Hoàng Mai",
        "Huyện Đông Anh",
        "Huyện Gia Lâm",
        "Quận Hai Bà Trưng",
        "Quận Nam Từ Liêm",
        "Quận Hà Đông",
        "Huyện Thanh Trì",
        "Quận Ba Đình",
        "Quận Bắc Từ Liêm",
        "Huyện Mê Linh",
        "Huyện Quốc Oai",
        "Quận Hoàn Kiếm",
        "Huyện Thường Tín",
        "Huyện Chương Mỹ",
        "Huyện Hoài Đức",
        "Quận Long Biên",
        "Quận Cầu Giấy",
        "Quận Tây Hồ",
        "Huyện Thanh Oai",
        "Huyện Sóc Sơn",
        "Huyện Thạch Thất",
        "Huyện Đan Phượng",
        "Huyện Phú Xuyên",
        "Huyện Mỹ Đức",
        "Thị xã Sơn Tây",
        "Huyện Ba Vì",
        "Huyện Ứng Hòa",
        "Huyện Phúc Thọ",
    ]
    var hnay = []
    var hqua = []
    for (var i = 0; i < quan.length; i++) {
        if (typeof (today.num) != 'undefined' && typeof (yesterday.num) != 'undefined') {
            hnay.push(today.num[`${quan[i]}`])
            hqua.push(yesterday.num[`${quan[i]}`])
        }
    }

    for (var i = 0; i < 28; i++) {
        var b = { 'quan': quan[i], 'hnay': hnay[i], 'hqua': hqua[i] }
        dataa.push(b)
    }
    return (
        <View style={styles.body}>
            <View style={styles.list}>
                <Text style={styles.row}>Quận/ Huyện</Text>
                <Text style={styles.row}>Hôm nay</Text>
                <Text style={styles.row}>Hôm qua</Text>
            </View>
            <FlatList
                data={dataa}
                keyExtractor={(item) => item.quan}
                renderItem={({ item }) =>
                    <View style={styles.list} >
                        <Text style={styles.row}>{item.quan}</Text>
                        <Text style={styles.row}>{item.hnay}</Text>
                        <Text style={styles.row}>{item.hqua}</Text>
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
        marginLeft: 30
    },
    row: {
        backgroundColor: '#fff',
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 2,
        paddingVertical: 10,
        textAlign: 'center'
    }
})
export default HaNoi