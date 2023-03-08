import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View className="flex-row border-b-[#ccc] border-b-2 pb-2 mb-6">
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text className="bg-[#AD40AF] font-bold">{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
