import React, { useState } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";

export default function WheelPicker() {
    const [selectedValue, setSelectedValue] = useState('January');

    const data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <ScrollPicker
        dataSource={data}
        selectedIndex={1}
       
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperBackground="#FFFFFF"
        itemHeight={60}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />
    )
}