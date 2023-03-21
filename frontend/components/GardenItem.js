import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GardenItem = ({ id }) => {
  const navigation = useNavigation();
  const [garden, setGarden] = useState({});
  console.log("id", id);
  const getItem = async () => {
    axios
      .get(`${BASE_URL}/garden/${id}`)
      .then((res) => {
        setGarden(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getItem();
    console.log(garden)
  }, []);
  const handleGardenNavigation = () => {
    navigation.navigate("GardenDetail", garden);
  };
  return (
    <View className="bg-white p-3 mb-5 rounded-md">
      <View className="flex-row justify-between mb-5">
        <View>
          <Text style={{ fontSize: 18, fontFamily: "HindBold" }}>
            {garden.name}
          </Text>
          {/* <Text style={{ fontSize: 14, fontFamily: "HindLight" }}>
            Latitude: {lat}, Longitude: {lon}
          </Text> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            handleGardenNavigation();
          }}
        >
          <MaterialIcons color="#0aada8" size={30} name="edit" />
        </TouchableOpacity>
      </View>
      <View className="ml-2 mb-3">
        <Text>{garden.group_key}</Text>
        <Text>{garden.desc}</Text>
      </View>
      <View className="flex-row justify-start mb-5 items-center">
        <ImageBackground
          source={require("../assets/hcmut.png")}
          style={{ width: 50, height: 50, justifyItems: "center" }}
          className="items-center flex-row ml-2"
          imageStyle={{ borderRadius: 25 }}
        />
        {/* <View className="ml-10">
          <Text>Humidity: {humid}%</Text>
          <Text>Temperature: {temp}oC</Text>
          <Text>Light: {light}lux</Text>
        </View> */}
      </View>
    </View>
  );
};

export default GardenItem;
