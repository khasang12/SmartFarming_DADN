import { View, ScrollView, Text } from "react-native";
import React from "react";
import { AccordionList } from "react-native-accordion-list-view";
import { farmers, devices } from "../data";
import ListItem from "../components/ListItem";

const GardenInfoPage = () => {
  return (
    <ScrollView className="pt-3 flex-1 bg-[#9ff731]" nestedScrollEnabled={true}>
      <View>
        <View className="flex-col p-3 rounded-md bg-[#2cd368] mb-5 mx-1 flex-1">
          <Text className="text-lg mb-2 font-bold border-b-2">Members</Text>

          {farmers.map((item, index) => (
            <ListItem
              key={index}
              type="farmer"
              name={item.name}
              photo="https://icon2.cleanpng.com/20180420/gee/kisspng-computer-icons-farmer-icon-design-clip-art-farmer-5ada50596fc531.0730372315242568574578.jpg"
              onPress={() => navigation.navigate("Farmer", item)}
            />
          ))}
        </View>

        <View className="flex-col p-3 rounded-md bg-[#2cd368] mb-5 mx-1">
          <Text className="text-lg mb-2 font-bold border-b-2">Sensors</Text>
          {devices.map((item, index) => (
            <ListItem
              key={index}
              type="device"
              name={item.feed_key}
              photo="https://icon2.cleanpng.com/20180717/kvf/kisspng-computer-icons-share-icon-iot-icon-5b4e0ea4b7cbf7.5834559515318422127528.jpg"
              onPress={() => navigation.navigate("Device", item)}
            />
          ))}
        </View>

        <View className="flex-col p-3 rounded-md bg-[#2cd368] mb-5 mx-1">
          <Text className="text-lg mb-2 font-bold border-b-2">Output Devices</Text>
          {devices.map((item, index) => (
            <ListItem
              key={index}
              type="device"
              name={item.feed_key}
              photo="https://icon2.cleanpng.com/20180717/kvf/kisspng-computer-icons-share-icon-iot-icon-5b4e0ea4b7cbf7.5834559515318422127528.jpg"
              onPress={() => navigation.navigate("Device", item)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default GardenInfoPage;
