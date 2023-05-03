import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { BASE_URL } from "../config/config";
import { useContext } from "react";
import { MQTTContext } from "../context/MQTTContext";
import { createPushNotificationFactory } from "../services/NotificationFactory";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMinMaxThreshold = (typ,str) => {
  const arr = str.split(" ");
  if (typ.includes("Temp")) {
    return arr.slice(0, 2).join(" ");
  } else if (typ.includes("Humid")) {
    return arr.slice(2, 4).join(" ");
  } else if (typ.includes("Light")) {
    return arr.slice(4, 6).join(" ");
  } else {
    return arr.slice(6).join(" ");
  }
};

export default function SensorListItem({ feed_key, otype, item, photo, name, disable, value }) {
  const [threshold,setThreshold] = useState([0,0])
  const {conn} = useContext(MQTTContext);
  const [connect, setConnect] = useState(true);
  const { width: windowWidth } = Dimensions.get("window");
  const [showInfo, setShowInfo] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(undefined);
  const pushNotificationFactory = createPushNotificationFactory();
  const pushNotification = pushNotificationFactory.createPushNotification();
  useEffect(() => {
    axios
      .get(
        "https://io.adafruit.com/api/v2/Potato_Stack/feeds/control/data?limit=1"
      )
      .then((res) => setThreshold(getMinMaxThreshold(name,res.data[0].value)))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  handleUpdate = async (string) => {
    setValueUpdated(string)
    const val = eval(string);
    if (val < threshold[0]){
      pushNotification.createPushMsg(
        await AsyncStorage.getItem("expoPushToken"),
        "Alert!",
        name+" is too low. Please take action now."
      );
    }
    if (val > threshold[1]) {
      pushNotification.createPushMsg(
        await AsyncStorage.getItem("expoPushToken"),
        "Alert!",
        name + " is too high. Please take action now."
      );
    }
  };
  
  init = () => {
    try 
    {
      conn.subcribeTopic(feed_key,handleUpdate);
    }
    catch(err) 
    {}
  } 

  init();


  function getValue({topic, payloadString})
  {
    if (topic == feed_key) 
      setValueUpdated(payloadString);
  }

  return (
    <View>
      <View className="flex-row justify-between align-center mb-5">
        <View className="flex-1 flex-row items-center">
          <Image
            source={{ uri: photo }}
            style={{ width: 30, height: 30, borderRadius: 10, marginRight: 8 }}
          />
          <View style={{ width: windowWidth - 220 }}>
            <Text
              numberOfLines={1}
              className="text-[#000]"
              style={{
                fontFamily: "HindRegular",
                fontSize: 20,
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        {!disable && otype === "sensor" && (
          <TouchableOpacity
            onPress={() => {
              setShowInfo(!showInfo);
            }}
            className="bg-[#6a8caf] p-3 w-25 rounded-md"
          >
            <Text
              className="text-white align-center"
              style={{
                fontFamily: "HindRegular",
                fontSize: 14,
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {showInfo && !disable && (
        <View>
          <Text className="text-lg">Feed Key: {feed_key}</Text>
          <Text className="text-lg">
            Value: <Text className="text-red">{valueUpdated}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}
