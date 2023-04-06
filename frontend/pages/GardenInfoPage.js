import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { farmers, devices } from "../data";
import FarmerListItem from "../components/FarmerListItem";
import axios from "axios";
import { BASE_URL } from "../config/config";
import SensorListItem from "../components/SensorListItem";
import OutputListItem from "../components/OutputListItem";


const GardenInfoPage = ({ route, navigation }) => {
 
  const [sensorsData, setSensorsData] = useState([]);
  const [outputData, setOutputData] = useState([]);

  const {topic_list, group_key} = route.params?.garden;
  const outputDevices = [
    ...topic_list.fan,
    ...topic_list.pump,
    ...topic_list.motor,
  ];

  const getSensorsInfo = async (sensors) => {
    let promises = [];
    let list = [];
    for (let sensorId of sensors) {
      promises.push(
        axios
          .post(`${BASE_URL}/sensor/device/latest`, {
            feed_key: `${group_key}/feeds/${sensorId}`,
            type: "sensor",
          })
          .then((res) => list.push(res.data))
          .catch((err) => console.err(err))
      );
    }
    Promise.all(promises).then(() => setSensorsData(list));
  };
  const getOutputInfo = async (outputs) => {
    let promises = [];
    let list = [];
    for (let outputId of outputs) {
      promises.push(
        axios
          .post(`${BASE_URL}/sensor/device/latest`, {
            feed_key: `${group_key}/feeds/${outputId}`,
            type: "device",
          })
          .then((res) => list.push(res.data))
          .catch((err) => console.err(err))
      );
    }
    Promise.all(promises).then(() => setOutputData(list));
  };

  useEffect(() => {
    getSensorsInfo(topic_list.sensor);
    getOutputInfo(outputDevices);
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
          {sensorsData.map((item, index) => (
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
          {outputData.map((item, index) => (
            <OutputListItem
              key={index}
              otype="output"
              name={item.name}
              feed_key={item.feed_key}
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
