import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const GardenHistory = ({ key, name, color, timestamp, humid, light, temp }) => {

  return (
    <View
      className="bg-white p-3 mb-5 rounded-md flex-col text-yellow-200"
      style={{ backgroundColor: color }}
    >
      <Text style={{ fontSize: 16, fontFamily: "HindLight", color: "#eee" }}>
        {timestamp}
      </Text>
      <Text style={{ fontSize: 17, fontFamily: "MontserratRegular", color: "black"}}>
        Humidity: {humid}%
      </Text>
      <Text style={{ fontSize: 17, fontFamily: "MontserratRegular", color: "black" }}>
        Temperature: {temp}oC
      </Text>
      <Text style={{ fontSize: 17, fontFamily: "MontserratRegular", color: "black" }}>
        Light: {light}lux
      </Text>
    </View>
  );
};

export default GardenHistory;
