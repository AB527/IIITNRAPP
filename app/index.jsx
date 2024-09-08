import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from "expo-router";
import localData from './data.json';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { MobileAlert, CapitalizeFirstLetter } from "./utility.js"

const logo_size = 30

const RootLayout = () => {
  const [bgImage, setBGImage] = useState(require("../assets/home_welcome/welcome_morning_3.png"))
  const [timeStat, setTimeStat] = useState("morning")
  React.useEffect(() => {
    const nowHour = (new Date()).getHours();
    if (nowHour > 12 && nowHour <= 16) {
      setTimeStat("afternoon")
      setBGImage(require(`../assets/home_welcome/welcome_afternoon_4.png`))
    }
    else if (nowHour > 16 || nowHour < 6) {
      setTimeStat("evening")
      setBGImage(require(`../assets/home_welcome/welcome_evening_10.png`))
    }

  }, []);

  const name = "Bedekar Atharva Suresh"

  return (
    <ScrollView>
      <ImageBackground style={styles.bg_image} resizeMode="cover" source={bgImage}>
        <Text style={[styles.welcome_line_1, timeStat == "evening" ? styles.color_white : styles.color_black]} className="font-bold">Good {CapitalizeFirstLetter(timeStat)},</Text>
        <Text style={[styles.welcome_line_2, timeStat == "evening" ? styles.color_white : styles.color_black]} className="font-bold">{name.toUpperCase()}</Text>
        <View style={styles.gridContainer}>
          {
            localData.home.options.map((op, i) =>
              <Link href={{ pathname: op.link, params: { name: op.name } }} key={i} style={{ height: 150, width: 150, marginBottom: 20 }} name="op">
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
        <View style={styles.actionConatiner}>
          <TouchableOpacity style={styles.actionConatinerItem} className="py-4" onPress={()=>MobileAlert("Dark mode is currently unavailable")}>
            <Text>Switch to dark mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionConatinerItem} className="py-4" onPress={()=>MobileAlert("Logging you out...")}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </ScrollView>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  bg_image: {
    width: '100%',
    height: '100%',
    alignSelf: "center",
  },
  welcome_image: {
    width: '95%',
    height: '50%',
    alignSelf: "center",
    marginHorizontal: "auto",
    marginTop: 30
  },
  welcome_line_1: {
    marginLeft: 20,
    fontSize: 27,
    marginTop: 75
  },
  welcome_line_2: {
    marginLeft: 20,
    fontSize: 25,
    marginTop: 10,
    marginBottom: 40,
    maxWidth: "70%"
  },
  color_white: {
    color: "#fff"
  },
  color_black: {
    color: "#000"
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 10
  },
  gridItem: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    backgroundColor: "#c296e1",
    borderRadius: 10
  },
  actionConatiner: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    paddingHorizontal: 10
  },
  actionConatinerItem: {
    width: "90%",
    alignSelf: "center",
    paddingLeft: 10,
    backgroundColor: "rgb(230,230,230)",
    elevation: 7,
    borderRadius: 5,
    marginVertical: 15
  }
})