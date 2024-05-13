import React from "react";
import { View, Text, SectionList, StyleSheet, Button } from "react-native";
import { useState } from "react";

export default function State() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View>
      <Text style={styles.text}>{count}</Text>
      <Button title="increment" onPress={increment} />
      <Button title="decrement" onPress={decrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20,
  },
  text: {
    color: "red",
    fontSize: 25,
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 100,
  },
  container2: {
    margin: 10,
    backgroundColor: "gray",
  },
});

// const updateNote = (id) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "UPDATE notes set note = ?  WHERE id = ?", 
//         [text, id],
//         (txObj, resultSet) => {
//           if (resultSet.rowsAffected > 0) {
//             let existingNote = [...notes];
//             const indexToUpdate = existingNote.findIndex(note => note.id === id)
//             existingNote[indexToUpdate].note = text;
//             setNotes(text);
//             setText("")
//           }
//         },
//         (txObj, error) => console.log(error)
//       );
//     });
//   }