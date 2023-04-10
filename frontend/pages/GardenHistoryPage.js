import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { gardenHistory } from "../data";
import GardenHistory from "../components/GardenHistory";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../config/config";

const GardenHistoryPage = ({ route, navigation }) => {
  const [sensorsData, setSensorsData] = useState([]);
  const { topic_list, group_key } = route.params?.garden;

  const getSensorsInfo = async (sensors) => {
    let promises = [];
    let list = [];
    for (let sensorId of sensors) {
      await promises.push(
        axios
          .post(`${BASE_URL}/sensor/device/latest?limit=10`, {
            feed_key: `${group_key}/feeds/${sensorId}`,
            type: "sensor",
          })
          .then((res) => {list = list.concat(res.data);console.log(res.data)})
          .catch((err) => console.err(err))
      );
    }
    Promise.all(promises).then(() =>
      setSensorsData(
        list.sort(function (a, b) {
          return (
            new Date(b?.last_update).getTime() -
            new Date(a?.last_update).getTime()
          );
        })
      )
    );
  };
  useEffect(() => {
    getSensorsInfo(topic_list.sensor);
  }, []);
  return (
    <ScrollView className="pt-3 flex-1 bg-[#eef9bf]">
      {/* Button to navigate Statistics */}

      {/* List of Gardens */}
      {sensorsData &&
        sensorsData.map((item, index) => (
          <GardenHistory
            key={index}
            name={item.name}
            feed={item.feed_key}
            timestamp={item.last_update}
            value={item.value}
          />
        ))}
    </ScrollView>
  );
};

export default GardenHistoryPage;
