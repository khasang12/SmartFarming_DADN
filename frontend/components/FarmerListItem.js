import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

export default function FarmerListItem({
  otype,
  name,
  photo,
  onPress,
  email,
  phone,
  disable,
}) {
  const { width: windowWidth } = Dimensions.get("window");
  const [showInfo, setShowInfo] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
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

        {!disable && (
          <TouchableOpacity
            onPress={() => {
              setShowInfo(!showInfo);
            }}
            className="bg-[#00D8FF] p-3 w-25 rounded-md"
          >
            <Text
              className="text-black align-center"
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
      {showInfo && !disable && (
        <View>
          {email && <Text>Email: {email}</Text>}
          {phone && <Text>Phone: {phone}</Text>}
        </View>
      )}
    </View>
  );
}
