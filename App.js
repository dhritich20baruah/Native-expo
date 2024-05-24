// import State from "./components/state";
// import Radio from "./components/Radio";
// import Child from "./components/Child";
// import Flatslist from "./components/Flatslist";
// import Sectional from "./components/Sectional";
// import CameraFunction from "./components/Camera";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  ScrollView, SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarComponent from "./components/Calender";

export default function App() {
  return (
    <View style={{ margin: 25, flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>React Native App</Text>
      <CalendarComponent
        onDayPress={(day) => Alert.alert(`Date pressed: ${day.dateString}`)}
      />
    </View>
  );
}

{
  /* <StatusBar style="auto"/>
      <View style={styles.container2}>
        <Child name="Nobody" country="Nowhere"/>
      </View>
  */
}

{
  /* <Image source={require('./assets/reactNative.jpg')}/> */
}
