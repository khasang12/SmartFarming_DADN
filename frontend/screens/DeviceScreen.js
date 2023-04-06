import { View, Text, Image, Switch } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-native-slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/config";
import { MQTTContext } from "./GardenDetailScreen";



const DeviceScreen = ({ route, navigation }) => {

  const { name, feed_key, type, status, value, desc, last_update, conn } =
    route.params;
  const [isEnabled, setIsEnabled] = useState();
  const [isAuto, setIsAuto] = useState(false);
  const toggleEnable = async () => {
    curState = isEnabled
    await setIsEnabled(!curState);
    await setValue(!curState);
  };

  const getValue = () => {
    axios
      .post(`${BASE_URL}/sensor/device/latest`, {
        feed_key,
        type: -1,
      })
      .then((res) => setIsEnabled(res.data.value))
      .catch((err) => console.log(err));
  };

  // conn.client.onMessageArrived = getValue;  

  // function getValue({topic, payloadString})
  // {
  //   if(payloadString == '1')
  //   setIsEnabled(true);
  //   else setIsEnabled(false);
  // }

  const setValue = async (state) => {
    await conn.publish(feed_key, state ? "1" : "0");
  };

  useEffect(() => {
    if (conn.connected == true) {
      try {
        conn.subcribeTopic(feed_key);
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log('chưa kết nối')
    }
    getValue();
  }, []);
  const toggleAuto = () => setIsAuto((previousState) => !previousState);
  return (
    <View className="flex-col justify-items-start pt-5 px-3 bg-[#eef9bf] flex-1">
      <Text
        className="font-bold text-5xl mb-2 mt-4"
        style={{ fontFamily: "MontserratBold" }}
      >
        {name}
      </Text>

      <View className="p-4 bg-white w-full rounded-xl mb-6">
        <Text className="text-lg">Feed Key: {feed_key}</Text>
        <Text className="text-lg">Device Type: {type}</Text>
        <Text className="text-lg">Status: {isEnabled ? "On" : "Off"}</Text>
        {/* <Text className="text-lg">Value: {value.$numberDecimal}</Text> */}
        {/* <Text className="text-lg">
          Last Update: {last_update.$date.$numberLong}
        </Text> */}
      </View>

      <View className="flex-col items-center">
        {type == "fan" && (
          <Image
            source={require("../assets/fan.png")}
            style={{ width: 166, height: 230 }}
          />
        )}
        {type == "motor" && (
          <Image
            source={require("../assets/motor.png")}
            style={{ width: 266, height: 230 }}
          />
        )}
        {type == "pump" && (
          <Image
            source={require("../assets/pump.png")}
            style={{ width: 166, height: 230 }}
          />
        )}

        <View className="flex-row justify-between w-3/4">
          <View className="flex-col items-center">
            {isEnabled != null && (
              <Switch
                trackColor={isEnabled ? "#767577" : "#81b0ff"}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleEnable}
                value={isEnabled}
              />
            )}
            <Text className="text-lg">ON/OFF</Text>
          </View>
          <View className="flex-col items-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAuto ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleAuto}
              value={isAuto}
            />
            <Text className="text-lg">AUTO</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceScreen;
