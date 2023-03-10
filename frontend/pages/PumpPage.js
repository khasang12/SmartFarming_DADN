import { View, Text, Image, Switch } from "react-native";
import React, { useState } from "react";

const pump = require("../assets/pump.png");
import Slider from "react-native-slider";

const PumpPage = ({ props }) => {
  const { feed_key, type, status, value, desc, last_update } = props;
  const [isEnabled, setIsEnabled] = useState(status);
  const [isAuto, setIsAuto] = useState(false);
  const [curValue, setCurValue] = useState(0);
  const toggleEnable = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleAuto = () => setIsAuto((previousState) => !previousState);
  return (
    <View className="flex-col justify-items-start">
      <Text
        className="font-bold text-5xl mb-2 mt-4"
        style={{ fontFamily: "MontserratBold" }}
      >
        {desc}
      </Text>
      <View className="p-4 bg-white w-full rounded-xl mb-6">
        <Text className="text-lg">Feed Key: {feed_key}</Text>
        <Text className="text-lg">Device Type: {type}</Text>
        <Text className="text-lg">
          Status: {isEnabled ? isEnabled : status}
        </Text>
        <Text className="text-lg">Value: {value.$numberDecimal}</Text>
        <Text className="text-lg">
          Last Update: {last_update.$date.$numberLong}
        </Text>
      </View>
      <Slider
        value={curValue}
        maximumValue={100}
        step={20}
        minimumTrackTintColor="#2cd368"
        maximumTrackTintColor="#fff"
        onValueChange={(value) => setCurValue(value)}
      />
      <Text className="text-lg">Value: {curValue}</Text>

      <View className="flex-col items-center">
        <Image source={pump} style={{ width: 144, height: 208 }} />
        <View className="flex-row justify-between w-3/4">
          <View className="flex-col items-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleEnable}
              value={isEnabled}
            />
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

export default PumpPage;
