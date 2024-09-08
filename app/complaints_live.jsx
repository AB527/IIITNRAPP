import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

const complaints_live = () => {

  const params = useLocalSearchParams();

  return (
    <View className="h-full" style={{ justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <Text>No live complaints found</Text>
    </View>
  )
}

export default complaints_live

const styles = StyleSheet.create({})