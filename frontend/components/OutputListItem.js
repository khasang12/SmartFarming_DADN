import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { MQTTContext } from "../screens/GardenDetailScreen";

export default function OutputListItem({ otype, item, photo, name, disable }) {
  const { width: windowWidth } = Dimensions.get("window");
  const navigation = useNavigation();
  const conn = useContext(MQTTContext)
  return (
    <View>
      <View className="flex-row justify-between align-center mb-5">
        <View className="flex-1 flex-row items-center">
          <Image
            source={{ uri: photo }}
            style={{ width: 30, height: 30, borderRadius: 10, marginRight: 8 }}
          />
          <View style={{ width: windowWidth - 220 }}>
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
        {!disable && otype !== "sensor" && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Device", { ...item, conn:conn});
            }}
            className="bg-[#6a8caf] p-3 w-25 rounded-md"
          >
            <Text
              className="text-white align-center"
              style={{
                fontFamily: "HindRegular",
                fontSize: 14,
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
