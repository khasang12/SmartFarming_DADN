import { useIsFocused, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import axios from "axios";

const HomeGardenItem = ({ garden }) => {
    const isFocused = useIsFocused()
  const { topic_list, group_key, userId } = garden;
  const [sensorsData, setSensorsData] = useState([]);
  useEffect(() => {
    getSensorsInfo(topic_list.sensor);
  }, [isFocused]);
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
  return (
    <View className="bg-[#b4f5bc] rounded-lg p-5 mr-5 items-center">
      <Text className="font-bold text-xl mb-3">{garden.name}</Text>
      <View className="flex-row justify-between">
        {sensorsData &&
          sensorsData.map((item, index) => (
            <ItemValue key={index} name={item.name} value={item.value} />
          ))}
      </View>
    </View>
  );
};

const ItemValue = ({name,value}) => {
    const IconByName = (typ) => {
      if (typ.includes("Temp")) {
        return ["temperature-celsius", "#F84F31"];
      } else if (typ.includes("Humid")) {
        return ["water", "#94dfff"];
      } else if (typ.includes("Light")) {
        return ["weather-sunny", "#ffcc00"];
      } else {
        return ""
      }
    };
    const icon = IconByName(name);
    return (
      <View className="flex-col items-center mx-3">
        <MaterialCommunityIcons name={icon[0]} color={icon[1]} size={40} />
        <Text className="text-lg">{value}</Text>
      </View>
    );
}

export default HomeGardenItem;
