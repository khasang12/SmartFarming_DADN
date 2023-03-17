import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../config/config";

const AddGardenScreen = () => {
  const [data, setData] = useState({
    adaUsername: "davidhuynh22",
    name: "Hello World",
    desc: "Init Garden",
    boundary: [],
    group_key: "Potato_Stack",
  });
  const [sensorList, setSensorList] = useState([
    "Potato_Stack/feeds/iot-cnpm.sensor1",
    "Potato_Stack/feeds/iot-cnpm.sensor2",
    "Potato_Stack/feeds/iot-cnpm.sensor3",
  ]);
  const [fanList, setFanList] = useState([
    "Potato_Stack/feeds/iot-cnpm.button1",
    "Potato_Stack/feeds/iot-cnpm.button2",
  ]);
  const [motorList, setMotorList] = useState([]);
  const [pumpList, setPumpList] = useState([]);
  const [boundaryList, setBoundaryList] = useState([]);
  const handleCreateGarden = async (e) => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    const sendingData = {
      ...data,
      userId: await JSON.parse(userInfo)._id,
      topic_list: {
        sensor: sensorList,
        fan: fanList,
        pump: pumpList,
        motor: motorList,
      },
      boundary: [],
    };
    axios
      .post(`${BASE_URL}/garden/create`, sendingData)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAdd = (type) => {
    if (type === "sensor") {
      setSensorList([...sensorList, ""]);
    } else if (type === "fan") {
      setFanList([...fanList, ""]);
    } else if (type === "motor") {
      setMotorList([...motorList, ""]);
    } else if (type === "pump") {
      setPumpList([...pumpList, ""]);
    } else if (type === "boundary") {
      setBoundaryList([...boundaryList, ""]);
    }
  };
  return (
    <View className="flex-1 justify-center bg-[#eef9bf] pt-3">
      <ScrollView className="px-5 pt-5">
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 38,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          New Garden
        </Text>

        <InputField
          label={"Adafruit Username"}
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.adaUsername}
          onChangeText={(t) => setData({ ...data, adaUsername: t })}
          keyboardType="default"
        />

        <InputField
          label={"Garden Name"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.name}
          onChangeText={(t) => setData({ ...data, name: t })}
          keyboardType="default"
        />

        <InputField
          label={"Garden Group Key"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.group_key}
          onChangeText={(t) => setData({ ...data, group_key: t })}
          keyboardType="default"
        />

        <InputField
          label={"Description"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.desc}
          onChangeText={(t) => setData({ ...data, desc: t })}
          keyboardType="default"
        />

        <View>
          <View className="my-4 flex-row justify-between">
            <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
              Boundary
            </Text>
            <TouchableOpacity onPress={() => handleAdd("boundary")}>
              <Text style={{ color: "#0aada8" }}>Add</Text>
            </TouchableOpacity>
          </View>

          {boundaryList &&
            boundaryList.map((item, index) => (
              <View key={index}>
                <InputField
                  label={"Lat " + (index + 1)}
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }}
                    />
                  }
                  value={item.lat}
                  keyboardType="default"
                />
                <InputField
                  label={"Lon " + (index + 1)}
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }}
                    />
                  }
                  value={item.lon}
                  keyboardType="default"
                />
              </View>
            ))}
        </View>

        <View>
          <View className="my-4 flex-row justify-between">
            <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
              Sensors
            </Text>
            <TouchableOpacity onPress={() => handleAdd("sensor")}>
              <Text style={{ color: "#0aada8" }}>Add</Text>
            </TouchableOpacity>
          </View>

          {sensorList &&
            sensorList.map((item, index) => (
              <InputField
                key={index}
                label={"Sensor " + (index + 1)}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                value={item}
                onChangeText={(t) => setSensorList([...sensorList, t])}
                keyboardType="default"
              />
            ))}
        </View>

        <View>
          <View className="my-4 flex-row justify-between">
            <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>Fans</Text>
            <TouchableOpacity onPress={() => handleAdd("motor")}>
              <Text style={{ color: "#0aada8" }}>Add</Text>
            </TouchableOpacity>
          </View>

          {fanList &&
            fanList.map((item, index) => (
              <InputField
                key={index}
                label={"Fan " + (index + 1)}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                value={item}
                onChangeText={(t) => setFanList([...fanList, t])}
                keyboardType="default"
              />
            ))}
        </View>

        <View>
          <View className="my-4 flex-row justify-between">
            <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>Motors</Text>
            <TouchableOpacity onPress={() => handleAdd("motor")}>
              <Text style={{ color: "#0aada8" }}>Add</Text>
            </TouchableOpacity>
          </View>

          {motorList &&
            motorList.map((item, index) => (
              <InputField
                key={index}
                label={"Motor " + (index + 1)}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                value={item}
                onChangeText={(t) => setMotorList([...motorList, t])}
                keyboardType="default"
              />
            ))}
        </View>

        <View>
          <View className="my-4 flex-row justify-between">
            <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>Pumps</Text>
            <TouchableOpacity onPress={() => handleAdd("motor")}>
              <Text style={{ color: "#0aada8" }}>Add</Text>
            </TouchableOpacity>
          </View>

          {pumpList &&
            pumpList.map((item, index) => (
              <InputField
                key={index}
                label={"Pump " + (index + 1)}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                value={item}
                onChangeText={(t) => setPumpList([...pumpList, t])}
                keyboardType="default"
              />
            ))}
        </View>

        <CustomButton label={"Create"} onPress={() => handleCreateGarden()} />
      </ScrollView>
    </View>
  );
};

export default AddGardenScreen;
