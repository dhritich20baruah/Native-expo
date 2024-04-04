import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function Radio(){
    const [option, setOption] = useState(null)

    const handleOption = (option) => {
        setOption(option)
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={option == 'option1' ? styles.selectedOption : styles.option} onPress={()=>handleOption('option1')}>
            <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={option == 'option2' ? styles.selectedOption : styles.option} onPress={()=>handleOption('option1')}>
            <Text>Option 2</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    option: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 5,
    },
    selectedOption: {
      borderWidth: 1,
      borderColor: '#007bff',
      backgroundColor: '#e7f2ff',
      padding: 10,
      marginVertical: 5,
    },
  });
  