import { ScrollView, Text, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ActionHistory from "../components/ActionHistory";
import axios from "axios";
import { BASE_URL } from "../config/config";

const GardenActionPage = ({ route, navigation }) => {
  const [outputData, setOutputData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { topic_list, group_key } = route.params?.garden;
  const outputDevices = [
    ...topic_list.fan,
    ...topic_list.pump,
    ...topic_list.motor
  ];
  useEffect(() => {
    getOutputInfo(outputDevices);
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Perform the data fetching operation here
    getOutputInfo(outputDevices).then(() => {
      setRefreshing(false);
    });
  }, []);

  const getOutputInfo = async (outputs) => {
    let promises = [];
    let list = [];
    if (outputs == []) return null;
    const thresholdFeeds = ["auto","control"]
    for (let outputId of thresholdFeeds) {
      promises.push(
        axios
          .get(
            `https://io.adafruit.com/api/v2/Potato_Stack/feeds/${outputId}/data?limit=5`
          )
          .then((res) => (list = list.concat(res.data)))
          .catch((err) => {
            console.log(err);
          })
      );
    }
    for (let outputId of outputs) {
      promises.push(
        axios
          .post(`${BASE_URL}/sensor/device/latest?limit=10`, {
            feed_key: `${group_key}/feeds/${outputId}`,
            type: "device",
          })
          .then((res) => {list = list.concat(res.data)})
          .catch((err) => console.err(err))
      );
    }
    Promise.all(promises).then(() =>
      setOutputData(
        list.sort(function (a, b) {
          return (
            new Date(b?.last_update ? b?.last_update:b?.created_at).getTime() -
            new Date(a?.last_update ? a?.last_update:a?.created_at).getTime()
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
      {/* List of Gardens */}
      {outputData && outputData.length > 0 ? (
        outputData.map((item, index) => (
          <ActionHistory
            key={index}
            name={item.name?item.name : (item.feed_key.includes("control")?"Control":"Auto")}
            feed={item.feed_key}
            value={item.value}
            user="test"
            timestamp={item.last_update || item.created_at}
          />
        ))
      ) : (
        <Text className="justify-center items-center flex-row flex-1">
          No Data
        </Text>
      )}
    </ScrollView>
  );
};

export default GardenActionPage;
