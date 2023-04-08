import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GardenNavigator from "../navigation/GardenNavigator";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import MQTTConnection from "../components/mqttService";
import { useIsFocused } from "@react-navigation/native";
import { Context } from "react";

export const MQTTContext = React.createContext(null);
const GardenDetailScreen = ({ route, navigation }) => {
  const garden = route.params;
  userName = "Potato_Stack"
  password = "aio_JZvY63VOPyGgS4WZFaZ6Z5ueDEc2"
  const isFocused = useIsFocused();

  const [conn, setconn] = useState(undefined);
  // const [connectState, setConnectState] = useState(false);

  useEffect(() => {
    async function init() {
      return new Promise((resolve) => { 
        console.log(conn);
      if (conn && conn.client.isConnected() == true) {
        console.log('already connect');
        resolve(conn);
      }
      if (isFocused && conn == undefined) {
        console.log('start to connect');
        const newClient = new MQTTConnection([], userName, password);
        newClient.connect(success, fail);
        function success() {
          console.log('connected bro');
          resolve(newClient);
        }
        function fail() {
          console.log('connect fail, reconnecting....');
          newClient.connect(success, fail);
        }
      }
    })
} 
init().then((result) => {
  console.log('done');
  setconn(result);
}).catch((err) => {
  console.log(err);
})
  }, [isFocused]);



return (
  <View className="pt-10 px-3 flex-1 justify-center bg-[#eef9bf]">
    {/* Header */}
    <View className="flex-row justify-between">
      <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>Garden 1</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ViewMap", {
            boundary: garden.boundary,
            name: garden.name,
            desc: garden.desc,
          });
        }}
        className="bg-[#6a8caf] p-3 mb-7 rounded-md"
      >
        <Text
          className="text-center text-[#000]"
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 16,
          }}
        >
          View Map
        </Text>
      </TouchableOpacity>
    </View>
    {/* Navigator */}
    {conn ? (<MQTTContext.Provider value={conn}>
      <GardenNavigator garden={garden} />
    </MQTTContext.Provider>) : (<Text style={{ fontSize: 24, fontFamily: "HindBold" }}> Đang tải</Text>)}
  </View>
);
};

export default GardenDetailScreen;

<Text style={{ fontSize: 24, fontFamily: "HindBold" }}>Garden 1</Text>

