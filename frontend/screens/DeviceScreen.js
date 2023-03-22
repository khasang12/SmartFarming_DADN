import { View, Text, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "react-native-slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/config";

const DeviceScreen = ({ route, navigation }) => {
  const { name, feed_key, type, status, value, desc, last_update } =
    route.params;
  const [isEnabled, setIsEnabled] = useState();
  const [isAuto, setIsAuto] = useState(false);
  const toggleEnable = async () => {
    await setIsEnabled((previousState) => !previousState);
    await setValue();
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
  const setValue = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    axios
      .post(
        "https://io.adafruit.com/api/v2/" + feed_key + "/data",
        {
          value: isEnabled ? "0" : "1",
        },
        {
          headers: {
            "X-AIO-Key": userInfo.x_aio_key,
          },
        }
      )
      .then((res) => console.log(res.data.value))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    /* var timerID = setInterval(() => getValue(), 1000);
    return () => clearInterval(timerID); */
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
      {/* <Slider
        value={curValue}
        maximumValue={100}
        minimumTrackTintColor="#2cd368"
        maximumTrackTintColor="#fff"
        step={20}
        onValueChange={(value) => setCurValue(value)}
      /> */}
      {/* <Text className="text-lg">Value: {curValue}</Text> */}
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
            {isEnabled!=null && (
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
