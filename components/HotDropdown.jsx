import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

const HotDropdown = ({
    data,
    labelField,
    valueField,
    placeholder,
    value,
    setValue,
    style
}) => {
    return (
        <Dropdown
            style={[styles.dropdown, style]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
        />
    );
};

export default HotDropdown;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
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
    }
})