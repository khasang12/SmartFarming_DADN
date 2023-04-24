import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress, fullScreen }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#6a8caf] p-3 mb-7 rounded-md w-2/5 justify-center items-center"
    >
      <Text
        className={`text-center text-white`}
        style={{
          fontFamily: "MontserratRegular",
          fontSize: 20,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}