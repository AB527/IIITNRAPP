import { StyleSheet, Text, View, Image, Linking } from 'react-native'
import React from 'react'
import localData from './data.json';
import { Stack, useLocalSearchParams } from 'expo-router';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const logo_size = 20

const lostandfound_item = () => {
    const post = useLocalSearchParams();
    return (
        <View className="h-full w-full">
            <Stack.Screen
                options={{
                    title: post.status,
                }}
            />
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <Text className="mb-3 mt-1 font-bold" style={{fontSize: 25}}>Title: {post.title}</Text>
                <Text className="mb-3">Description: {post.description}</Text>
                <Text className="mb-3">Contact Name: {post.contact_name}</Text>
                <Text className="mb-3">
                    Contact No: {post.phone}{"   "}
                    <FontAwesomeIcon
                        name="phone"
                        size={logo_size}
                        onPress={() => Linking.openURL(`tel:${post.phone}`)}
                    />
                </Text>
                <Text className="mb-3">
                    Email: {post.email}{"   "}
                    <FontAwesomeIcon
                        name="envelope"
                        size={logo_size}
                        onPress={() => Linking.openURL(`mailto:${post.email}?subject=Product Inquiry&body=Hi, I am interested in your product. Please contact me.`)}
                    />
                </Text>
                <Text className="mb-3">Posted on: {post.publish_date} {post.publish_time}</Text>
            </View>
            <Image style={styles.uploaded_image} source={require('../assets/no_image_available.png')}></Image>
        </View>
    )
}

export default lostandfound_item

const styles = StyleSheet.create({
    uploaded_image: {
        width: "100%",
        alignSelf: "center",
        aspectRatio: 1/1,
        marginTop: 20
    }
})