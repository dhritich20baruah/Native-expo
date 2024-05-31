import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function OCRCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "authorized");
    })();
  }, []);

  if (device == null) return <Text>Loading...</Text>;
  if (!hasPermission) return <Text>No camera permission</Text>;

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      flash: "on",
    });
    navigation.navigate("OCRScreen", { uri: photo.path });
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        ref={camera}
      />
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
}
