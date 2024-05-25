import React from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {Agenda} from 'react-native-calendars';

export default function Calendar_list() {
  return (
    <SafeAreaView style={styles.container}>
    <Agenda
      selected="2024-05-25"
      items={{
        '2024-05-25': [{name: 'Cycling'}, {name: 'Walking'}, {name: 'Running'}],
        '2024-05-25': [{name: 'Writing'}]
      }}
      renderItem={(item, isFirst) => (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    itemText: {
      color: '#888',
      fontSize: 16,
    }
  });