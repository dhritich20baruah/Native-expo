import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarComponent(props) {
  const initDate = "2024-05-27";
  const [selected, setSelected] = useState(initDate);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#800000",
        selectedTextColor: "white",
      },
    }),
    [selected]
  );

  const running = { key: "running", color: "blue" };
  const cycling = { key: "cycling", color: "green" };
  const walking = { key: "walking", color: "orange" };
  const markedDates = {
    "2024-05-28": {
      dots: [running, walking],
    },
    "2024-05-27": {
      dots: [running, walking, cycling],
    },
  };
  return (
    <View style={styles.container}>
      <Calendar
        initialDate={initDate}
        minDate="2024-05-24"
        maxDate="2024-06-24"
        disableAllTouchEventsForDisabledDays={true}
        firstDay={0}
        showWeekNumbers={false}
        hideArrows={false}
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={(day) => {
          setSelected(day.dateString);
          props.onDaySelect && props.onDaySelect(day);
        }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
