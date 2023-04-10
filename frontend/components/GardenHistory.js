import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const getColorCode = (typ,val) => {
  if (typ.includes("Temp")){
    if (val < 15 || val > 40) return ["#F84F31", "°C"];
    else if (val < 20 || val > 35) return ["#ffcc00", "°C"];
    else return ["#99cc33", "°C"];
  }
  else if (typ.includes("Humid")) {
    if (val < 10 || val > 90) return ["#F84F31", "%"];
    else if (val < 20 || val > 80) return ["#ffcc00", "%"];
    else return ["#99cc33", "%"];
  }
  else if (typ.includes("Light")) {
    if (val < 100 || val > 20000) return ["#F84F31", "lux"];
    else if (val < 3000 || val > 10000) return ["#ffcc00", "lux"];
    else return ["#99cc33","lux"];
  }
  else{
    return ["#ccc", "??"];
  }
};

const GardenHistory = ({ name, feed, timestamp, value }) => {
  const status = getColorCode(name,parseFloat(value))
  console.log(name);
  return (
    <View
      className="bg-[#a7e9af] p-3 mb-5 rounded-md flex-col text-yellow-200"
      style={{
        backgroundColor: status[0],
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 16, fontFamily: "HindLight", color: "#000" }}>
        {timestamp && new Date(timestamp)?.toLocaleString()}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "MontserratBold",
          color: "black",
        }}
      >
        Name: {name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "MontserratSemiBold",
          color: "black",
        }}
      >
        Feed: {feed.slice(-16)}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "MontserratRegular",
          color: "black",
        }}
      >
        Value: {value}{status[1]}
      </Text>
    </View>
  );
};

export default GardenHistory;
