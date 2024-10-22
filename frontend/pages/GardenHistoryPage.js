import { ScrollView, Text, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    sensors = topic_list.sensor.filter(item => item!="control" && item!="auto")
    getSensorsInfo(sensors);
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    sensors = topic_list.sensor.filter(
      (item) => item != "control" && item != "auto"
    );
    // Perform the data fetching operation here
    getSensorsInfo(sensors).then(() => {
      setRefreshing(false);
    });
  }, []);

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
          .then((res) => {list = list.concat(res.data)})
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
  
  return (
    <ScrollView
      className="pt-3 flex-1 bg-[#eef9bf]"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Button to navigate Statistics */}

      {/* List of Gardens */}
      {sensorsData && sensorsData.length > 0 ? (
        sensorsData.map((item, index) => (
          <GardenHistory
            key={index}
            name={item.name}
            feed={item.feed_key}
            timestamp={item.last_update}
            value={item.value}
          />
        ))
      ) : (
        <Text>No Data</Text>
      )}
    </ScrollView>
  );
};

export default GardenHistoryPage;
