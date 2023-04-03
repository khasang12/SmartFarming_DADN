import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#2CD368] p-5 mb-7 rounded-xl"
    >
      <Text
        className="text-center text-[#fff]"
        style={{
          fontFamily: "MontserratRegular",
          fontSize: 24,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}