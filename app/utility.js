import { Platform, ToastAndroid, AlertIOS } from 'react-native'
export function MobileAlert(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    AlertIOS.alert(msg);
  }
}
export const CapitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}