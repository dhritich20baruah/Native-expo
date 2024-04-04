import React from 'react'
import { View, Text } from 'react-native'

const Child = (props) => {
  return (
    <View>
        <Text style={{'color': 'white'}}>{props.message}, I am {props.name} from {props.country}</Text>
    </View>
  )
}

Child.defaultProps = {
    message: 'Hello World!!'
}

export default Child