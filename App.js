// import State from "./components/state";
// import Radio from "./components/Radio";
// import Child from "./components/Child";
// import Flatslist from "./components/Flatslist";
// import Sectional from "./components/Sectional";
// import CameraFunction from "./components/Camera";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarComponent from "./components/Calender";
import Calendar_list from "./components/Calendar_list";
import DatePickerComponent from "./components/DatePicker";
import WheelPicker from "./components/WheelPicker";
// import OCRCamera from "./components/OCRCamera";
// import OCRScreen from "./components/OCRScreen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("med-logger2.db");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [pillTimings, setPillTimings] = useState([]);

  // const meds = [
  //   {
  //     AfterBreakfast: "10:00",
  //     AfterDinner: "",
  //     AfterLunch: "",
  //     BeforeBreakfast: "",
  //     BeforeDinner: "",
  //     BeforeLunch: "",
  //     endDate: "2024-12-18",
  //     friday: 1,
  //     id: 1,
  //     medicineName: "Cilacar 20",
  //     monday: 1,
  //     saturday: 1,
  //     startDate: "2024-06-18",
  //     sunday: 1,
  //     thursday: 1,
  //     tuesday: 1,
  //     user_id: 1,
  //     wednesday: 1,
  //   },
  //   {
  //     AfterBreakfast: "10:00",
  //     AfterDinner: "16:25",
  //     AfterLunch: "",
  //     BeforeBreakfast: "",
  //     BeforeDinner: "",
  //     BeforeLunch: "",
  //     endDate: "2024-09-18",
  //     friday: 1,
  //     id: 2,
  //     medicineName: "Alpha Keto Analogue",
  //     monday: 1,
  //     saturday: 1,
  //     startDate: "2024-06-18",
  //     sunday: 1,
  //     thursday: 1,
  //     tuesday: 1,
  //     user_id: 1,
  //     wednesday: 1,
  //   },
  //   {
  //     AfterBreakfast: "",
  //     AfterDinner: "",
  //     AfterLunch: "",
  //     BeforeBreakfast: "",
  //     BeforeDinner: "16:20",
  //     BeforeLunch: "",
  //     endDate: "2024-12-18",
  //     friday: 1,
  //     id: 3,
  //     medicineName: "Minipress XL",
  //     monday: 1,
  //     saturday: 1,
  //     startDate: "2024-06-18",
  //     sunday: 1,
  //     thursday: 1,
  //     tuesday: 1,
  //     user_id: 1,
  //     wednesday: 1,
  //   },
  // ];

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM medicine_list",
        null,
        (txObj, resultSet) => {
          setPillTimings(resultSet.rows._array);
          // console.log(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });

    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  schedulePushNotification(pillTimings);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>React Native Notifications</Text>
      {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
    </View>
  );
}

async function schedulePushNotification(medications) {
  const now = new Date();

  for (const med of medications) {
    const startDate = new Date(med.startDate);
    const endDate = new Date(med.endDate);

    // Check if the current date is within the medication period
    if (now >= startDate && now <= endDate) {
      const daysOfWeek = [
        med.sunday,
        med.monday,
        med.tuesday,
        med.wednesday,
        med.thursday,
        med.friday,
        med.saturday,
      ];

      // Get today's day of the week (0-6 where 0 is Sunday)
      const today = now.getDay();

      if (daysOfWeek[today]) {
        // Schedule notifications for the relevant times
        const times = [
          { time: med.BeforeBreakfast, label: "Before Breakfast" },
          { time: med.AfterBreakfast, label: "After Breakfast" },
          { time: med.BeforeLunch, label: "Before Lunch" },
          { time: med.AfterLunch, label: "After Lunch" },
          { time: med.BeforeDinner, label: "Before Dinner" },
          { time: med.AfterDinner, label: "After Dinner" },
        ];

        for (const { time, label } of times) {
          if (time) {
            const [hours, minutes] = time.split(":").map(Number);
            const notificationTime = new Date(now);
            notificationTime.setHours(hours, minutes, 0, 0);

            // Only schedule future notifications
            if (notificationTime > now) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: `Time to take your medication: ${med.medicineName}`,
                  body: `${label} - ${med.medicineName}`,
                },
                trigger: {
                  seconds: (notificationTime.getTime() - now.getTime()) / 1000,
                },
              });
            }
          }
        }
      }
    }
  }
}

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

// export default function App() {
//   return (
//     <ScrollView>
//     <View style={{ margin: 25 }}>
//       <Text style={{ textAlign: "center" }}>React Native App</Text>
//       {/* <CalendarComponent
//         onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)}
//         />
//         <WheelPicker/> */}
//       {/* <Calendar_list/> */}
//       {/* <DatePickerComponent/> */}
//       {/* <OCRCamera/> */}
//       {/* <OCRScreen/> */}
//     </View>
//     </ScrollView>
//   );
// }

{
  /* <StatusBar style="auto"/>
      <View style={styles.container2}>
        <Child name="Nobody" country="Nowhere"/>
      </View>
  */
}

{
  /* <Image source={require('./assets/reactNative.jpg')}/> */
}
