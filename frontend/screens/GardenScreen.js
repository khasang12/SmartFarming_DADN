import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GardenItem from "../components/GardenItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import init, { Client } from 'react_native_mqtt';
import Paho from "paho-mqtt";
import { log } from "react-native-reanimated";
import { BASE_URL } from "../config/config";
import { useIsFocused } from "@react-navigation/native";

const GardenScreen = ({ navigation }) => {
  const [gardens, setGardens] = useState([]);
  const isFocused = useIsFocused();
  const getList = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    await axios
      .get(`${BASE_URL}/garden?userId=${JSON.parse(userInfo)._id}`)
      .then((res) => setGardens(res.data))
      .catch((err) => console.log(err));
  };
  userName = "davidhuynh22"
  password = "aio_bycn1154ctLCUtXTwnacwJafCeWm"
  
  useEffect(() => {
    getList();
  }, [isFocused]);

  return (
    <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
      <ScrollView className="p-5">
        {/* Header */}
        <View className="flex-row justify-between mb-5">
          <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
            My gardens
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddGardenStack");
            }}
          >
            <MaterialIcons
              color="#0aada8"
              size={30}
              name="add-circle-outline"
            />
          </TouchableOpacity>
        </View>

        {/* List of Gardens */}
        {gardens &&
          gardens.map((item, index) => <GardenItem key={index} garden={item} />)}

        {/* <TouchableOpacity
          onPress={() => conn.subcribeTopic("Potato_Stack/feeds/iot-cnpm.button1")}
        >
          <Text>Test Subscribe</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>

  );
};


export default GardenScreen;
