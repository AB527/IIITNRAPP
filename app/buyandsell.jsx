import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity, Platform, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import localData from "./data.json";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Stack, useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import HotInput from '../components/HotInput';

function BuyScreen() {
  return (
    <View className="items-center bg-white h-full w-full" style={{ alignItems: "center" }}>
      {
        localData.buyandsell.map((post, i) =>
          <TouchableOpacity onPress={() => router.push({ pathname: "/buyandsell_item", params: post })} style={styles.post_item} key={i}>
            <View style={styles.post_item_data} className="w-2/3">
              <Text className="font-bold mb-1 mt-1">{post.title}</Text>
              <Text className="mb-3">{post.description}</Text>
              <Text>Price: {"\u20B9"}{post.price}</Text>
              <Text className="mb-3">Posted on: {post.publish_date} {post.publish_time}</Text>
            </View>
            <Image style={styles.post_item_image} source={require('../assets/no_image_available.png')}></Image>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

function SellScreen() {
  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

  };

  const onSellRequest = () => {

  }

  return (
    <ScrollView className="bg-white h-full w-full" contentContainerStyle={{ alignItems: "center" }}>
      <SafeAreaView style={{ marginBottom: 20, width: "95%", alignSelf: "center" }}>
        <HotInput
          setValue={setProductName}
          value={productName}
          label='Product Name'
          charLimit={30}
        />
        <HotInput
          setValue={setDescription}
          value={description}
          label='Location'
          charLimit={300}
        />
        <HotInput
          setValue={setContactNo}
          value={contactNo}
          label='Contact No'
          charLimit={10}
        />
        <HotInput
          setValue={setPrice}
          value={price}
          label='Price'
          charLimit={6}
        />
      </SafeAreaView>
      <View style={{ width: "95%", paddingHorizontal: 12, marginBottom: 50, alignItems: "flex-start" }}>
        <Button title="Upload image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.uploaded_image} />}
      </View>
      <TouchableHighlight
        style={{
          marginBottom: 30
        }}>
        <Button onPress={() => onSellRequest()}
          title="Sell Product"
        />
      </TouchableHighlight>
    </ScrollView>
  );
}

function HistoryScreen() {
  return (
    <View className="items-center bg-white h-full w-full">
      {
        localData.buyandsell.map((post, i) =>
          <TouchableOpacity onPress={() => router.push({ pathname: "/buyandsell_item", params: post })} style={styles.post_item} className="w-11/12" elevation={7} key={i}>
            <View style={styles.post_item_data}>
              <Text className="font-bold mb-1 mt-1">{post.title}</Text>
              <Text className="mb-3">{post.description}</Text>
              <Text>Price: {"\u20B9"}{post.price}</Text>
              <Text className="mb-3">Posted on: {post.publish_date} {post.publish_time}</Text>
            </View>
            <Image className="w-1/3" style={styles.post_item_image} source={require('../assets/no_image_available.png')}></Image>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Buy item"
        component={BuyScreen}
        options={{
          tabBarLabel: 'Buy item',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="shopping-cart" size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Sell item"
        component={SellScreen}
        options={{
          tabBarLabel: 'Sell item',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="plus" size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Your history"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="history" size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const buyandsell = () => {
  const params = useLocalSearchParams();
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <NavigationContainer independent={true}>
        <MyTabs />
      </NavigationContainer>
    </>
  )
}

export default buyandsell

const styles = StyleSheet.create({
  post_item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'rgb(247,247,247)',
    elevation: 10, // Android
  },
  post_item_data: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "66%"
  },
  post_item_image: {
    flex: 1,
    width: '33%',
    height: '100%',
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  uploaded_image: {
    width: "100%",
    alignSelf: "center",
    marginTop: 30,
    aspectRatio: 1/1
  }
})