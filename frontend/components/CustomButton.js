import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress, fullScreen }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#6a8caf] p-5 mb-7 rounded-md w-1/2 justify-center items-center"
    >
      <Text
        className={`text-center text-white`}
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
