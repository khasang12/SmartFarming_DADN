import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GardenItem from "../components/GardenItem";
import { gardens } from "../data";

const GardenScreen = () => {
  return (
    <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
      <ScrollView className="p-5">
        {/* Header */}
        <View className="flex-row justify-between mb-5">
          <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
            My gardens
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons
              color="#0aada8"
              size={30}
              name="add-circle-outline"
            />
          </TouchableOpacity>
        </View>

        {/* List of Gardens */}
        {gardens.map((item, index) => (
          <GardenItem
            key={index}
            name={item.name}
            desc={item.desc}
            lat={item.lat}
            lon={item.lon}
            humid={item.humid}
            temp={item.temp}
            light={item.light}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default GardenScreen;
