import { StyleSheet, Text, View, ToastAndroid, AlertIOS, Platform, Linking } from 'react-native'
import React from 'react'
import localData from "./data.json";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Stack, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

const logo_size=25

const contacts = () => {

  const params = useLocalSearchParams();

  const copyToClipboard = async text => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View className="items-center justify-center bg-white w-full">
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      {
        localData.contacts.map((contact,i)=>
          <View style={styles.contact_item} key={i} className="w-11/12 py-3">
            <View>
              <Text>{contact.name}</Text>
              <Text>{contact.position}</Text>
            </View>
            <Text>{contact.number}</Text>
            <FontAwesomeIcon
              name="copy"
              size={logo_size}
              onPress={()=>copyToClipboard(contact.number)}
            />
            <FontAwesomeIcon
              name="phone"
              size={logo_size}
              onPress={()=>Linking.openURL(`tel:${contact.number}`)}
            />
          </View>
        )
      }
    </View>
  )
}

export default contacts

const styles = StyleSheet.create({
  contact_item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "#b342f5",
    borderRadius: 10,
    alignItems: "center"
  }
})