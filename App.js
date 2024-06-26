// import State from "./components/state";
// import Radio from "./components/Radio";
// import Child from "./components/Child";
// import Flatslist from "./components/Flatslist";
// import Sectional from "./components/Sectional";
// import CameraFunction from "./components/Camera";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarComponent from "./components/Calender";
import Calendar_list from "./components/Calendar_list";
import DatePickerComponent from "./components/DatePicker";
import WheelPicker from "./components/WheelPicker";
// import OCRCamera from "./components/OCRCamera";
// import OCRScreen from "./components/OCRScreen";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("example.db");

export default function App() {
  return (
    <ScrollView>
    <View style={{ margin: 25 }}>
      <Text style={{ textAlign: "center" }}>React Native App</Text>
      {/* <CalendarComponent
        onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)}
        />
        <WheelPicker/> */}
      {/* <Calendar_list/> */}
      {/* <DatePickerComponent/> */}
      {/* <OCRCamera/> */}
      {/* <OCRScreen/> */}
    </View>
    </ScrollView>
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
