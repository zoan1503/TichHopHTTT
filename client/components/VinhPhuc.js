import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Axios from 'axios';
const VinhPhuc = ({ }) => {
    const [today, setToday] = useState({});
    const [yesterday, setYesterday] = useState({});

    useEffect(() => {
        Axios
            .get("http://192.168.16.101:8000/numcase/getvinhphuc", {})
            .then(
                function (response) {
                    setToday(response.data[response.data.length - 1]);
                    setYesterday(response.data[response.data.length - 2]);
                }
            );
    }, []);
    var dataa = []
    var quan = [
        "Thành phố Vĩnh Yên",
        "Thành phố Phúc Yên",
        "Huyện Bình Xuyên",
        "Huyện Sông Lô",
        "Huyện Lập Thạch",
        "Huyện Tam Dương",
        "Huyện Tam Đảo",
        "Huyện Yên Lạc",
        "Huyện Vĩnh Tường"
    ]
    var hnay = []
    var hqua = []
    for (var i = 0; i < quan.length; i++) {
        if (typeof (today.num) != 'undefined' && typeof (yesterday.num) != 'undefined') {
            hnay.push(today.num[`${quan[i]}`])
            hqua.push(yesterday.num[`${quan[i]}`])
        }
    }

    for (var i = 0; i < 9; i++) {
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
export default VinhPhuc