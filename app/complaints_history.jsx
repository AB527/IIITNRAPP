import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

const complaints_history = () => {
  const params = useLocalSearchParams();
  return (
    <View className="h-full" style={{justifyContent:"center", alignItems:"center"}}>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      /> 
      <Text>No history</Text>
    </View>
  )
}

export default complaints_history

const styles = StyleSheet.create({})