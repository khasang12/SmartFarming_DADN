import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const AddGardenScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused
  const [data, setData] = useState({
    garden_name: route.params ? route.params?.garden.name : "Hello World",
    desc: route.params ? route.params?.garden.desc : "Init Garden",
    group_name: route.params ? route.params?.garden.group_name : "iot-cnpm",
    group_key: route.params ? route.params?.garden.group_key : "Potato_Stack",
    x_aio_key: "",
    adaUserName: "Potato_Stack"
  });
  const [userInfo, setUserInfo] = useState(data)
  useEffect(() => {
    console.log("Render");
    async function getUserInfo() {
      temp = await AsyncStorage.getItem("userInfo");
      temp = JSON.parse(temp);
      setUserInfo(temp);
      setData((data) => { return { ...data, x_aio_key: temp.x_aio_key } })
    }
    getUserInfo();
  }, [])

  const handleFindGarden = async (e) => {
    const headers = {
      "Content-Type": "application/json",
      "X-AIO-Key": await userInfo.x_aio_key,
    };
    axios
      .get(`https://io.adafruit.com/api/v2/${data.group_key}/groups/${data.group_name}`, { headers })
      .then((res) => {
        navigation.navigate("AddDevice", {
          adaUserName: data.adaUserName,
          x_aio_key: data.x_aio_key,
          garden_name: data.garden_name,
          desc: data.desc,
          thresholds: [30,32,59,65,500,1800,0,10],
          group_name: data.group_name,
          group_key: data.group_key,
          feeds: res.data.feeds,
          boundary: route.params ? route.params?.garden.boundary : undefined,
          garden_data: route.params ? route.params.garden : undefined,
        });
      })
      .catch((err) => {
        Alert.alert(
          //title
          'Error in adafruit information',
          //body
          err.response.data.error,
          [
            { text: 'OK', onPress: () => console.log('Yes Pressed') },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        
      });
  };
  return (
    <View className="flex-1 justify-center bg-[#eef9bf] pt-5">
      <ScrollView className="px-5 pt-3">
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 30,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          {route.params ? route.params?.garden.name : "Create Garden"}
        </Text>

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 20,
            fontWeight: "500",
            color: "#000",
            marginBottom: 20,
          }}
        >
          Basic information
        </Text>

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
          value={data.garden_name}
          onChangeText={(t) => setData({ ...data, garden_name: t })}
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

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 20,
            fontWeight: "500",
            color: "#000",
            marginBottom: 20,
          }}
        >
          Adafruit information
        </Text>

        <InputField
          label={"Adafruit Username"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.adaUserName}
          onChangeText={(t) => setData({ ...data, adaUserName: t })}
          keyboardType="default"
        />

        <InputField
          label={"x_aio_key"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.x_aio_key}
          onChangeText={(t) => setData({ ...data, x_aio_key: t })}
          keyboardType="default"
        />

        <InputField
          label={"AdafruitIO Group Name"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          disabled={route.params ? true : false}
          value={data.group_name}
          onChangeText={(t) => setData({ ...data, group_name: t })}
          keyboardType="default"
        />

        <InputField
          label={"AdafruitIO Group Key"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          disabled={route.params ? true : false}
          value={data.group_key}
          onChangeText={(t) => setData({ ...data, group_key: t })}
          keyboardType="default"
        />

        <View className="justify-center flex-row">
          <CustomButton label={"Next"} onPress={() => handleFindGarden()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddGardenScreen;
