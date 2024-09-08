import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import localData from "./data.json";
import { Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const contactdevelopers = () => {
  const params = useLocalSearchParams();
  return (
    <ScrollView className="w-full mt-10">
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <View style={styles.image_conatiner}>
        <Image style={styles.lead_image} source={require('../assets/no_image_available.png')} />
        <Image style={styles.lead_image} source={require('../assets/no_image_available.png')} />
      </View>
      <Text style={styles.description_item}>{localData.contactdevelopers.lead1.description}</Text>
      <Text style={styles.description_item}>{localData.contactdevelopers.lead2.description}</Text>
      <View className="w-full mt-5 mb-5" style={{justifyContent: "center", alignItems: "center"}}>
        <Text className="font-bold" style={{fontSize: 20}}>Current Developers</Text>
        <View className="w-full py-2" style={{justifyContent: "center", alignItems: "center"}}>
          {
            localData.contactdevelopers.developers.map((developer,i)=>
              <View style={styles.developer_item} key={i} className="w-11/12 py-2">
                <Image style={styles.developer_image} source={require('../assets/no_image_available.png')} />
                <View style={{paddingLeft: 15}}>
                  <Text  className="font-bold">{developer.name}</Text>
                  <Text>{developer.email}</Text>
                </View>
              </View>
            )
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default contactdevelopers

const styles = StyleSheet.create({
  image_conatiner: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  lead_image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '40%',
    borderRadius: 1000
  },
  developer_image: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginLeft: 10
  },
  developer_item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center"
  },
  description_item: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10
  }
})