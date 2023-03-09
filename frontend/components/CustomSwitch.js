import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View className="h-12 w-full bg-[#2cd368] rounded-md border-[#000] flex-row justify-center">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        className="flex-1 rounded-md justify-center items-center"
        style={{
          backgroundColor: getSelectionMode == 1 ? "#2cd368" : "white",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? "white" : "#2cd368",
            fontSize: 18,
            fontFamily: "HindRegular",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        className="flex-1 rounded-md justify-center items-center"
        style={{
          backgroundColor: getSelectionMode == 2 ? "#2cd368" : "white",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 2 ? "white" : "#2cd368",
            fontSize: 18,
            fontFamily: "HindRegular",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
