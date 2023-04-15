import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ActionHistory from "../components/ActionHistory";
import axios from "axios";
import { BASE_URL } from "../config/config";

const GardenActionPage = ({ route, navigation }) => {
  const [outputData, setOutputData] = useState([]);
  const { topic_list, group_key } = route.params?.garden;
  const outputDevices = [
    ...topic_list.fan,
    ...topic_list.pump,
    ...topic_list.motor,
  ];

  const getOutputInfo = async (outputs) => {
    let promises = [];
    let list = [];
    if (outputs == []) return null;
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
            new Date(b?.last_update).getTime() -
            new Date(a?.last_update).getTime()
          );
        })
      )
    );
  };

  useEffect(() => {
    getOutputInfo(outputDevices);
  }, []);

  return (
    <ScrollView className="pt-3 flex-1 bg-[#eef9bf]">
      {/* List of Gardens */}
      {outputData && outputData.length > 0 ?
        outputData.map((item, index) => (
          <ActionHistory
            key={index}
            name={item.name}
            feed={item.feed_key}
            value={item.value}
            user="Sang Kha"
            timestamp={item.last_update}
          />
        )):<Text className="justify-center items-center flex-row flex-1">No Data</Text>}
    </ScrollView>
  );
};

export default GardenActionPage;
