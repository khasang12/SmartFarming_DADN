import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AccordionList } from "react-native-accordion-list-view";
import { farmers, devices } from "../data";
import FarmerListItem from "../components/FarmerListItem";
import DeviceListItem from "../components/OutputListItem";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/config";
import SensorListItem from "../components/SensorListItem";
import OutputListItem from "../components/OutputListItem";

const GardenInfoPage = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const [gardenInfo, setGardenInfo] = useState();
  const [sensorsData, setSensorsData] = useState([]);

  const garden = route.params.garden;
  const getSensorsInfo = async (sensors) => {
    for (let sensorId of sensors) {
      await axios
        .get(`${BASE_URL}/sensor/${sensorId}`)
        .then((res) => setSensorsData([...sensorsData, res.data.feed_key]))
        .catch((err) => console.err(err));
    }
  };
  useEffect(() => {
    //console.log("id info", garden);
    getSensorsInfo(garden.sensors);
    console.log("sensorsss: ", sensorsData);
  }, []);
  // Define otype: Output/ Device/ Farmer
  return (
    <ScrollView className="pt-3 flex-1 bg-[#eef9bf]" nestedScrollEnabled={true}>
      <View>
        <View className="flex-col p-3 rounded-md bg-[#a7e9af] mb-5 mx-1 flex-1">
          <Text className="text-lg mb-2 font-bold border-b-2">Members</Text>

          {farmers.map((item, index) => (
            <FarmerListItem
              key={index}
              otype="farmer"
              name={item.name}
              email={item.email}
              phone={item.phone}
              photo="https://icon2.cleanpng.com/20180420/gee/kisspng-computer-icons-farmer-icon-design-clip-art-farmer-5ada50596fc531.0730372315242568574578.jpg"
              onPress={() => {}}
            />
          ))}
        </View>

        <View className="flex-col p-3 rounded-md bg-[#a7e9af] mb-5 mx-1">
          <Text className="text-lg mb-2 font-bold border-b-2">Sensors</Text>
          {devices
            .filter((item) => item.type === "sensor")
            .map((item, index) => (
              <SensorListItem
                key={index}
                otype="sensor"
                name={item.name}
                feed_key={item.feed_key}
                item={item}
                disable={false}
                photo="https://icon2.cleanpng.com/20180717/kvf/kisspng-computer-icons-share-icon-iot-icon-5b4e0ea4b7cbf7.5834559515318422127528.jpg"
                onPress={() => navigation.navigate("Device", item)}
              />
            ))}
        </View>

        <View className="flex-col p-3 rounded-md bg-[#a7e9af] mb-5 mx-1">
          <Text className="text-lg mb-2 font-bold border-b-2">
            Output Devices
          </Text>
          {devices
            .filter((item) => item.type !== "sensor")
            .map((item, index) => (
              <OutputListItem
                key={index}
                otype="output"
                name={item.name}
                item={item}
                disable={false}
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
