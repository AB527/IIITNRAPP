import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import localData from './data.json';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Stack, useLocalSearchParams } from 'expo-router';

const logo_size=30

const gatepass = () => {

  const params = useLocalSearchParams();

  return (
    <View className="mt-10">
      <Stack.Screen
        options={{
          title: params.name,
        }}
      /> 
      <View style={styles.gridContainer}>
        {
          localData.gatepass.options.map((op,i)=>
            <Link href={{ pathname: op.link, params: { name: op.name } }} key={i}>
              <View style={styles.gridItem} elevation={5}>
                <FontAwesomeIcon
                  name={op.logo}
                  size={logo_size}
                />
                <Text>{op.name}</Text>
              </View>
            </Link>
          )
        }
      </View>
    </View>
  )
}

export default gatepass

const styles = StyleSheet.create({
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gridItem: {
    height:150,
    width:150,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    backgroundColor: "#c296e1",
    borderRadius: 10
  }
})