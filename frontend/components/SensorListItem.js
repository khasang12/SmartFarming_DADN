import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet, Alert } from "react-native";
import { BASE_URL } from "../config/config";
import { MQTTContext } from "../screens/GardenDetailScreen";
import { useContext } from "react";
import { useRef } from "react";


export default function SensorListItem({ feed_key, otype, item, photo, name, disable, value }) {


  const conn = useContext(MQTTContext);
  const { width: windowWidth } = Dimensions.get("window");
  const navigation = useNavigation();
  const [showInfo, setShowInfo] = useState(false);

  const [connect, setConnect] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(undefined);

  //const currentClient = useRef(null);
  useEffect(() => {
    if (conn && conn.connected == true && connect == false) {

      conn.subcribeTopic(feed_key, () => {
               conn.client.onMessageArrived = ({ topic, payloadString }) => {
          return function ({ topic, payloadString }) {
            console.log('received message:', feed_key, topic, payloadString);
            if (messageTopic === topic) {
              setValueUpdated(messagePayload);
            }
          };
        }},
        () => {
            console.log('fail to subcribe');
        });      
      setConnect(() => true);
    }
    else if (connect == true) {
      console.log('đã kết nối');
    }
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
          <Text className="text-lg">Feed Key: {feed_key}</Text>
          <Text className="text-lg">
            Value: <Text className="text-red">{valueUpdated}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}
