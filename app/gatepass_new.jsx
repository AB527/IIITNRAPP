import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView} from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react'
import HotInput from '../components/HotInput';

import { MobileAlert } from './utility';

const logo_size = 30, color_dark_green = "bg-lime-700"

const gatepass_new = () => {

  const params = useLocalSearchParams();
  const [purpose, setPurpose] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [passType, setPassType] = React.useState('daily');
  const [isCheckboxSelected, setCheckboxSelected] = React.useState(false);

  const getCurrentDateTime = () => {
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    return { date: date + '-' + month + '-' + year, time: `${d.getHours()}:${d.getMinutes()}` }; //format: d-m-y;
  }

  const getNextDate = () => {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getDate() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getFullYear()
  }

  const currentDateTime = getCurrentDateTime();
  const [dailyPassData, setDailyData] = useState({ outDate: currentDateTime.date, outTime: currentDateTime.time });
  const [homePassData, setPassData] = useState({ fromDate: currentDateTime.date, toDate: getNextDate() });

  const onNewPassRequest = () => {
    if (purpose.trim() == "") return MobileAlert('Please enter purpose');
    if (location.trim() == "") return MobileAlert('Please enter location');
    if (!isCheckboxSelected) return MobileAlert('Accept the checkbox to proceed');
    router.push({
      pathname: "/gatepass_pass", params: {
        name: "BEDEKAR ATHARVA SURESH",
        type: passType,
        passData: JSON.stringify(passType == "daily" ? dailyPassData : homePassData),
        purpose: purpose,
        location: location,
        approved_by: "Raman House"
      }
    })
  }

  const onDateChangeRequest = () => {
    if (passType == "daily") { }

  }

  return (
    <ScrollView className="h-full w-full" contentContainerStyle={{alignItems:"center"}}>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <View className="mt-5" style={{ alignItems: "center" }}>
        <Text className="font-bold" style={{ fontSize: 30 }}>Home pass Available : 4</Text>
        <Text className="font-bold" style={{ fontSize: 15 }}>For month of september</Text>
      </View>
      <View style={styles.gridContainer}>
        <Text className={`font-bold`} style={[styles.gridItem, passType == 'daily' ? styles.bg_dark_green : styles.bg_white]} onPress={() => setPassType("daily")}>Daily Pass</Text>
        <Text className={`font-bold`} style={[styles.gridItem, passType == 'home' ? styles.bg_dark_green : styles.bg_white]} onPress={() => setPassType("home")}>Home Pass</Text>
      </View>
      <SafeAreaView style={{ marginVertical: 30, width: "95%", alignSelf: "center" }}>
        <HotInput 
          label={'Purpose'}
          value={purpose}
          setValue={setPurpose}
        />
        <HotInput
          label={'Location'}
          value={location}
          setValue={setLocation}
        />
      </SafeAreaView>
      <Text className={`font-bold`} style={styles.passData} onPress={() => onDateChangeRequest()}>
        {
          passType == "daily" ? `${dailyPassData.outTime}\n${dailyPassData.outDate}` : `From: ${homePassData.fromDate}\nOut: ${homePassData.toDate}`
        }
      </Text>
      {passType == "daily" ? <></> : <Text className="font-bold">Click on top to change Date</Text>}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isCheckboxSelected}
          onValueChange={newValue => setCheckboxSelected(newValue)}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>I am going at my own risk</Text>
      </View>
      <Button
        title="Request"
        onPress={() => onNewPassRequest()}
      />
    </ScrollView>
  )
}

export default gatepass_new

const styles = StyleSheet.create({
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    width: "80%",
    alignSelf: "center"
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    fontSize: 30,
    textAlign: "center",
    width: "40%",
    height: 100,
    verticalAlign: "middle",
    borderRadius: 10
  },
  bg_white: {
    backgroundColor: "#fff"
  },
  bg_dark_green: {
    backgroundColor: "#489c4a"
  },
  passData: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    fontSize: 25,
    textAlign: "center",
    width: "60%",
    height: 100,
    verticalAlign: "middle",
    borderRadius: 10,
    alignSelf: "center",
  },
  passDataExtra: {
    alignSelf: "center",
    marginTop: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "center"
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxLabel: {
    margin: 8,
    fontSize: 20
  },
})