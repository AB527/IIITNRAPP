import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Platform, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import localData from "./data.json";
import { Stack, useLocalSearchParams } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import HotInput from '../components/HotInput';

function GlobalScreen() {
  return (
    <View className="items-center bg-white h-full w-full">
      {
        localData.lostandfound.map((post,i)=>
          <TouchableOpacity onPress={()=>router.push({pathname: "/lostandfound_item", params: post})} style={styles.post_item} className="w-11/12" key={i}>
            <View style={styles.post_item_data} className="w-2/3">
              <Text className="font-bold mb-2">{post.status}</Text>
              <Text className="mb-2">{post.title}</Text>
              <Text>Contatct name: {post.contact_name}</Text>
              <Text>Phone: {post.phone}</Text>
              <Text>Email: {post.email}</Text>
            </View>
            <Image className="w-1/3" style={styles.post_item_image} source={require('../assets/no_image_available.png')}></Image>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

function ReportLostScreen() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
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

  const onReportRequest = () => {

  }

  return (
    <View className="items-center bg-white h-full w-full">
      <SafeAreaView style={{ marginBottom: 30, width: "95%", alignSelf: "center" }}>
        <HotInput
          setValue={setTitle}
          value={title}
          label='Title'
          charLimit={20}
        />
        <HotInput
          setValue={setDescription}
          value={description}
          label='Description'
          charLimit={300}
        />
        <HotInput
          setValue={setContactNo}
          value={contactNo}
          label='Contact No'
          charLimit={10}
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
        <Button 
          onPress={() => onReportRequest()}
          title="Report lost item"
        />
      </TouchableHighlight>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View className="items-center bg-white h-full w-full">
      {
        localData.lostandfound.map((post,i)=>
          <TouchableOpacity onPress={()=>router.push({pathname: "/lostandfound_item", params: post})} style={styles.post_item} className="w-11/12" key={i}>
            <View style={styles.post_item_data} className="w-2/3">
              <Text className="font-bold mb-2">{post.status}</Text>
              <Text className="mb-2">{post.title}</Text>
              <Text>Contatct name: {post.contact_name}</Text>
              <Text>Phone: {post.phone}</Text>
              <Text>Email: {post.email}</Text>
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
        name="Global"
        component={GlobalScreen}
        options={{
          tabBarLabel: 'Global',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="globe" size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Report lost item"
        component={ReportLostScreen}
        options={{
          tabBarLabel: 'Report lost item',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="plus" size={size} />
          )
        }}
      />
      <Tab.Screen
        name="My history"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'My History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="history" size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const lostandfound = () => {
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

export default lostandfound

const styles = StyleSheet.create({
  post_item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'rgb(247,247,247)',
    elevation: 10
  },
  post_item_data: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  post_item_image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  uploaded_image: {
    width: "100%",
    alignSelf: "center",
    marginTop: 30,
    aspectRatio: 1/1
  }
})