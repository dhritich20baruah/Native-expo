import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  const handleInputChange = (inputText) => {
    setText(inputText)
  }
  const handlePress = () => {
    Alert.alert("Input Value", text)
  }

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!!</Text>
      <TextInput onChangeText={handleInputChange} value={text} placeholder='Enter text here' style={styles.input}/>
      <Button title="submit" onPress={handlePress}/>
      <Text style={styles.text}>{count}</Text>
      <Button title="increment" onPress={increment}/>
      <Button title="decrement" onPress={decrement}/>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 25,
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 100
  }
});
