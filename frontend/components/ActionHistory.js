import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function getMUICode(name) {
  if (name === "Fan") {
    return "fan";
  }
  if (name === "Pump") {
    return "pump";
  }
  if (name === "Curtain") {
    return "curtains";
  }
}
const ActionHistory = ({ name, feed, desc, user, timestamp }) => {
  return (
    <View className="bg-[#a7e9af] p-3 mb-5 rounded-md flex-row text-yellow-200 justify-between items-center">
      <View className="flex-row items-center justify-start">
        <MaterialCommunityIcons name={getMUICode(desc)} size={30}/>
        <View className="flex-col ml-3">
          <Text
            style={{ fontSize: 16, fontFamily: "HindLight", color: "gray" }}
          >
            {timestamp}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "MontserratSemiBold",
              color: "black",
            }}
          >
            {desc}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "MontserratRegular",
              color: "black",
            }}
          >
            Device: {feed}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "MontserratRegular",
              color: "black",
            }}
          >
            User: {user}
          </Text>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/hcmut.png")}
        style={{ width: 50, height: 50, justifyItems: "center" }}
        className="items-center flex-row ml-2"
        imageStyle={{ borderRadius: 25 }}
      />
    </View>
  );
};

export default ActionHistory;
