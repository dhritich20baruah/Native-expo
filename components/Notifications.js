import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,

} from "react-native";

import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("example.db");

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

  const meds = [
    {
      AfterBreakfast: "10:00",
      AfterDinner: "",
      AfterLunch: "",
      BeforeBreakfast: "",
      BeforeDinner: "",
      BeforeLunch: "",
      endDate: "2024-12-18",
      friday: 1,
      id: 1,
      medicineName: "Cilacar 20",
      monday: 1,
      saturday: 1,
      startDate: "2024-06-18",
      sunday: 1,
      thursday: 1,
      tuesday: 1,
      user_id: 1,
      wednesday: 1,
    },
    {
      AfterBreakfast: "10:00",
      AfterDinner: "16:25",
      AfterLunch: "",
      BeforeBreakfast: "",
      BeforeDinner: "",
      BeforeLunch: "",
      endDate: "2024-09-18",
      friday: 1,
      id: 2,
      medicineName: "Alpha Keto Analogue",
      monday: 1,
      saturday: 1,
      startDate: "2024-06-18",
      sunday: 1,
      thursday: 1,
      tuesday: 1,
      user_id: 1,
      wednesday: 1,
    },
    {
      AfterBreakfast: "",
      AfterDinner: "",
      AfterLunch: "",
      BeforeBreakfast: "",
      BeforeDinner: "16:20",
      BeforeLunch: "",
      endDate: "2024-12-18",
      friday: 1,
      id: 3,
      medicineName: "Minipress XL",
      monday: 1,
      saturday: 1,
      startDate: "2024-06-18",
      sunday: 1,
      thursday: 1,
      tuesday: 1,
      user_id: 1,
      wednesday: 1,
    },
  ];

  useEffect(() => {
  
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



