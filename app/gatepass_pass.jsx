import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

const gatepass_pass = () => {
    const pass = useLocalSearchParams();
    pass.passData = JSON.parse(pass.passData)
    return (
        <View>
            <Stack.Screen
                options={{
                    title: "View your pass",
                }}
            />
            <Text style={{ marginVertical: 30, fontSize: 20, alignSelf: "center" }} className="font-bold">Entry pass</Text>
            <Image style={styles.qr_code} source={require('../assets/qr_code_sample.png')}></Image>
            <Text style={{ marginVertical: 30, fontSize: 20, alignSelf: "center" }} className="font-bold">{pass.name}</Text>
            <View style={styles.pass_data}>
                <Text>Type: {pass.type=="daily"?"Daily":"Home"}</Text>
                {
                    pass.type == "daily" ?
                        <>
                            <Text>Date: {pass.passData.outDate}</Text>
                            <Text>From: {pass.passData.outTime}</Text>
                            <Text>To: {"22:30"}</Text>
                        </>
                        : <>
                            <Text>From: {pass.passData.fromDate}</Text>
                            <Text>To: {pass.passData.toDate}</Text>
                        </>

                }
                <Text>Location: {pass.location}</Text>
                <Text>Purpose: {pass.purpose}</Text>
                <Text className="mb-3">Approved by: {pass.approved_by}</Text>
            </View>
        </View>
    )
}

export default gatepass_pass

const styles = StyleSheet.create({
    qr_code: {
        height: 300,
        width: 300,
        alignSelf: "center",
        borderRadius: 10
    },
    pass_data: {
        width: "85%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: "center",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 10
    },
})