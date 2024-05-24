import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarComponent(props) {
    const marked = {
        '2024-05-27': {marked: true, dotColor: 'red'},
        '2024-05-29': {selected: true, selectedColor: "#800000", selectedTextColor: 'white'}
    }
  return (
    <View style={styles.container}>
      <Calendar
        initialDate="2024-05-20"
        minDate="2024-05-24"
        maxDate="2024-06-24"
        disableAllTouchEventsForDisabledDays={true}
        firstDay={0}
        showWeekNumbers={false}
        hideArrows={false}
        markedDates={marked}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
