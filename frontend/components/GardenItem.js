import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

const GardenItem = ({ garden }) => {
  const navigation = useNavigation();
  const handleGardenNavigation = () => {
    navigation.navigate("GardenDetail", garden);
  };
  const handleStatisticNavigation = () => {
    navigation.navigate("Statistic", garden);
  }
  return (
    <View className="bg-white p-3 mb-5 rounded-xl">
      <View className="flex-row justify-between mb-5">
        <View>
          <Text style={{ fontSize: 18, fontFamily: "HindBold" }}>
            {garden.name}
          </Text>
          {/* <Text style={{ fontSize: 14, fontFamily: "HindLight" }}>
            Latitude: {lat}, Longitude: {lon}
          </Text> */}
          <TouchableOpacity style={styles.button}
            onPress={() => {
              handleStatisticNavigation();
            }}
          >
            <Text style={styles.buttonText}>Statistics</Text>
          </TouchableOpacity>

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
        <Text>Group key: {garden.group_key}</Text>
        <Text>Description: {garden.desc}</Text>
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
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default GardenItem;
