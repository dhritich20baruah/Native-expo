import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function DatePickerComponent() {
    const [date, setDate] = useState(new Date());

    const onChange = (e, selectedDate) => {
      setDate(selectedDate);
    };

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        onChange={onChange}
      />
      <DateTimePicker
        value={date}
        mode={"time"}
        is24Hour={true}
        onChange={onChange}
      />
      <Text>{date.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
  });