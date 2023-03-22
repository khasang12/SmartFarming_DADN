import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { BASE_URL } from "../config/config";

export default function SensorListItem({ feed_key, otype, item, photo, name, disable, value }) {
  const { width: windowWidth } = Dimensions.get("window");
  const navigation = useNavigation();
  const [showInfo, setShowInfo] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(undefined);
  const getValue = async () => {
    axios
      .post(`${BASE_URL}/sensor/device/latest`, {
        feed_key,
        type:-1,
      })
      .then((res) => setValueUpdated(res.data.value))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    var timerID = setInterval(() => getValue(), 1000);
    return () => clearInterval(timerID);
    //getValue();
  }, []);
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
        {!disable && otype === "sensor" && (
          <TouchableOpacity
            onPress={() => {
              setShowInfo(!showInfo);
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
      {showInfo && !disable && (
        <View>
          <Text>Feed Key: {feed_key}</Text>
          <Text>Value: {valueUpdated}</Text>
        </View>
      )}
    </View>
  );
}
