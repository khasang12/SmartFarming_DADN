import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GardenNavigator from "../navigation/GardenNavigator";
import CustomButton from "../components/CustomButton";

const GardenDetailScreen = () => {
  return (
    <View className="pt-10 px-3 flex-1 justify-center bg-[#9ff731]">
      {/* Header */}
      <View className="flex-row justify-between">
        <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
          Your gardens
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          className="bg-[#00D8FF] p-3 mb-7 rounded-md"
        >
          <Text
            className="text-center text-[#000]"
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 16,
            }}
          >
            View Map
          </Text>
        </TouchableOpacity>
      </View>
      {/* Navigator */}
      <GardenNavigator />
    </View>
  );
};

export default GardenDetailScreen;
