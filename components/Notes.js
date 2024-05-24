import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

export default function Notes() {
    const [text, setText] = useState("");
    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false)
    const [noteId, setNoteId] = useState('')
    //database
    const db = SQLite.openDatabase("example.db");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)"
        );
      });
  
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM notes",
          null,
          (txObj, resultSet) => setNotes(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
      setIsLoading(false);
    }, []);
  
    // names == notes ; currentName == text
    const addNote = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO notes (note) values (?)",
          [text],
          (txObj, resultSet) => {
            let existingNote = [...notes];
            existingNote.push({ id: resultSet.insertId, note: text });
            setNotes(existingNote);
            setText("");
          },
          (txObj, error) => console.log(error)
        );
      });
    };
  
    const deleteNote = (id) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM notes WHERE id = ?",
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              let existingNote = [...notes].filter((note) => note.id != id);
              setNotes(existingNote);
            }
          },
          (txObj, error) => console.log(error)
        );
      });
    };
  
    const editNote = (id) => {
      setNoteId(id)
      setVisible(true)
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT note FROM notes  WHERE id = ?", 
          [id],
          (txObj, resultSet) => setText(resultSet.rows._array[0].note),
          (txObj, error) => console.log(error)
        );
      });
    }
  
    const updateNote = () => {
      console.log(noteId, text)
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE notes set note = ?  WHERE id = ?", 
          [text, noteId],
          (txObj, resultSet) =>{
            if (resultSet.rowsAffected > 0) {
              setNotes((prevNotes) => {
                return prevNotes.map((note) => {
                  if (note.id === noteId){
                    return {...note, note: text}
                  }
                  return note
                })
              })
              setText("");
              setVisible(false)
            }
          },
          (txObj, error) => console.log(error)
        );
      });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Notes</Text>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="Note"
          style={styles.input}
        />
        {visible?
        <TouchableOpacity onPress={updateNote} style={styles.button}>
          <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={addNote} style={styles.button}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        }
        {isLoading ? (
          <View style={styles.displayData}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={styles.displayData}>
            {notes.map((item) => {
              return (
                <View key={item.id} style={{ display: "flex", flexDirection: 'row'}}>
                  <Text style={styles.note}>
                    {item.id}. {item.note}{" "}
                  </Text>
                  <TouchableOpacity onPress={()=>deleteNote(item.id)} style={styles.deleteBtn}>
                    <Text style={styles.buttonText}>DELETE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>editNote(item.id)} style={styles.editBtn}>
                    <Text style={styles.buttonText}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      {/*  <CameraFunction/>   */}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
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
      width: "auto",
    },
    container2: {
      margin: 10,
      backgroundColor: "gray",
    },
    button: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    displayData: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    deleteBtn: {
      backgroundColor: "red",
      padding: 2,
      margin: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 80
    },
    editBtn: {
      backgroundColor: "blue",
      padding: 2,
      margin: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 80
    },
    note: {
      width: 200,
      margin: 5,
      padding: 3,
      fontSize: 20,
      backgroundColor: "#D3D3D3",
    },
  });