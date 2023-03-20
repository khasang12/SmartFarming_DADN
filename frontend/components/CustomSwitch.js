import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  option3,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View className="h-12 w-full bg-[#75b79e] rounded-md border-[#000] flex-row justify-center">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        className="flex-1 rounded-md justify-center items-center"
        style={{
          backgroundColor: getSelectionMode == 1 ? "#75b79e" : "white",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? "white" : "#75b79e",
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
          backgroundColor: getSelectionMode == 2 ? "#75b79e" : "white",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 2 ? "white" : "#75b79e",
            fontSize: 18,
            fontFamily: "HindRegular",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(3)}
        className="flex-1 rounded-md justify-center items-center"
        style={{
          backgroundColor: getSelectionMode == 3 ? "#75b79e" : "white",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 3 ? "white" : "#75b79e",
            fontSize: 18,
            fontFamily: "HindRegular",
          }}
        >
          {option3}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
