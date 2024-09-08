import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import localData from './data.json';
import { Stack, useLocalSearchParams } from 'expo-router';

const logo_size=30

const complaints = () => {
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
          localData.complaints.options.map((op,i)=>
            <Link href={{ pathname: op.link, params: { name: op.name } }} key={i}>
              <View style={styles.gridItem} elevation={5}>
                <FontAwesomeIcon
                  name={op.logo}
                  size={logo_size}
                />
                <Text style={{textAlign: "center"}}>{op.name}</Text>
              </View>
            </Link>
          )
        }
      </View>
    </View>
  )
}

export default complaints

const styles = StyleSheet.create({
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gridItem: {
    height:100,
    width:100,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    backgroundColor: "#c296e1",
    borderRadius: 10
  }
})