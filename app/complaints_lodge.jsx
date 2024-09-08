import { StyleSheet, View, Button, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import localData from "./data.json";
import { Stack, useLocalSearchParams } from 'expo-router';
import HotInput from '../components/HotInput';
import HotDropdown from '../components/HotDropdown';
import { MobileAlert } from './utility';

const complaints_lodge = () => {
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState("");
    const params = useLocalSearchParams();

    const onSubmitComplaint = () => {
        if(!category) return MobileAlert("Select category") 
        if(!description) return MobileAlert("Write description") 
    }

    return (
        <View className="items-center h-full w-full">
            <Stack.Screen
                options={{
                    title: params.name,
                }}
            />
            <HotDropdown 
                style={{alignSelf: "center", width: "85%", marginTop: 50}}
                data={localData.complaints_lodge.categories}
                labelField="label"
                valueField="value"
                placeholder="Select category"
                value={category}
                setValue={setCategory}
            />
            <SafeAreaView className="w-11/12 my-5">
                <HotInput
                    setValue={setDescription}
                    value={description}
                    label={"Description"}
                    charLimit={300}
                />
            </SafeAreaView>
            <Button
                title="Submit Complaint"
                onPress={() => onSubmitComplaint()}
            />
        </View>
    )
}

export default complaints_lodge

const styles = StyleSheet.create({
    pass_item_data: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    input: {
        width: "85%",
        alignSelf: "center",
        height: 50,
        marginTop: 30,
        borderWidth: 1,
        padding: 10,
    },

})