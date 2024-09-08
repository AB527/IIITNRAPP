import { View, Text } from "react-native"
import { FloatingLabelInput } from 'react-native-floating-label-input';

const HotInput = ({
    label,
    value,
    setValue,
    charLimit = null
}) => {
    return (
        <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
            <FloatingLabelInput
                label={label}
                value={value}
                onChangeText={v => { if ((charLimit && v.length <= charLimit) || !charLimit) setValue(v) }}
            />
            {charLimit && <Text style={{ alignSelf: "flex-end", marginHorizontal: 10, marginTop: 2 }}>{value.length}/{charLimit}</Text>}
        </View>
    );
};

export default HotInput;