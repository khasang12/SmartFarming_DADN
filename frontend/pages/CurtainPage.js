import { View, Text, Image, Switch } from "react-native";
import React, { useState } from "react";

const Curtain = require("../assets/curtain.png");
const CurtainPage = ({ props }) => {
  const { feed_key, type, status, value, desc, last_update } = props;
  const [isEnabled, setIsEnabled] = useState(status);
  const [isAuto, setIsAuto] = useState(false);
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
      <View className="flex-col items-center">
        <Image source={Curtain} style={{ width: 194, height: 166 }} />
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

export default CurtainPage;
