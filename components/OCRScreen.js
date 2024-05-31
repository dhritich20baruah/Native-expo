import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import TextRecognition from "react-native-text-recognition";

const OCRScreen = ({ route }) => {
  const { uri } = route.params;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await TextRecognition.recognize(uri);
      setText(result.json(" "));
      setLoading(false);
    })();
  }, [uri]);

  if (loading) return <ActivityIndicator size="large" color="red" />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri }} style={{ width: "100%", height: 300 }} />
      <Text>{text}</Text>
    </View>
  );
};

export default OCRScreen