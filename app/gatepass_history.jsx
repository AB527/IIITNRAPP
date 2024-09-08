import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import localData from "./data.json";
import { Stack, useLocalSearchParams } from 'expo-router';
import HotDropdown from '../components/HotDropdown';

const gatepass_history = () => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const params = useLocalSearchParams();
 
  const getYearFilter = () => {
    const filter = new Array((new Date).getFullYear()+1 - 2015).fill().map((d, i) => { return {label: (i + 2015).toString(), value: i + 2015}})
    return [{label: "All time", value: 0}].concat(filter);
  }
  const yearFilter = getYearFilter();
  return (
    <View className="items-center justify-center w-full">
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <View style={styles.gridContainer} className="w-full">
        <HotDropdown
          style={{ width: "35%"}}
          data={localData.gatepass_history.filter.months}
          labelField="label"
          valueField="value"
          placeholder="Select month"
          value={month}
          onChange={setMonth}
        />
        <HotDropdown
          style={{ width: "35%"}}
          data={yearFilter}
          labelField="label"
          valueField="value"
          placeholder="Select year"
          value={year}
          onChange={setYear}
        />
      </View>
      <View className="w-full">
        {
          localData.gatepass_history.data.map((pass, i) =>
            <View style={styles.pass_item_data} elevation={7} key={i}>
              <Text>OutTime: {pass.outtime_date} ({pass.outtime_time})</Text>
              <Text>InTime: {pass.intime_date} ({pass.intime_time})</Text>
              <Text>Location: {pass.location}</Text>
              <Text>Purpose: {pass.purpose}</Text>
              <Text className="mb-3">Approved by: {pass.approved_by}</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}

export default gatepass_history

const styles = StyleSheet.create({
  pass_item_data: {
    width: "85%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#ba03fc",
    borderRadius: 10,
    alignSelf: "center"
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
})