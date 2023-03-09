import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

export default function ListItem({ type, name, photo, onPress }) {
  const { width: windowWidth } = Dimensions.get("window");
  return (
    <View className="flex-row justify-between align-center mb-5">
      <View className="flex-1 flex-row items-center">
        <Image
          source={{ uri: photo }}
          style={{ width: 30, height: 30, borderRadius: 10, marginRight: 8 }}
        />
        <View style={{ width: windowWidth - 220 }}>
          {/* <Text
            style={{
              color: "#333",
              fontFamily: "HindRegular",
              fontSize: 14,
            }}
          >
            {subTitle}
          </Text> */}
          <Text
            numberOfLines={1}
            className="text-[#000]"
            style={{
              fontFamily: "HindRegular",
              fontSize: 20,
            }}
          >
            {name}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        className="bg-[#00D8FF] p-3 w-25 rounded-md"
      >
        <Text
          className="text-black align-center"
          style={{
            fontFamily: "HindRegular",
            fontSize: 14,
          }}
        >
          {type == "device" && "Status"}
          {type == "farmer" && "Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
