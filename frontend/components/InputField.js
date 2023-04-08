import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  disabled,
  onChangeText
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View className="flex-row border-b-[#ccc] border-b-2 pb-2 mb-6">
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
          secureTextEntry={passwordVisible}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          selectTextOnFocus={false}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          selectTextOnFocus={false}
        />
      )}
      {inputType == "password" && (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialCommunityIcons
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#666"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
