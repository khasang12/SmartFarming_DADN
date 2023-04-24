import { View, Text, ScrollView, Switch, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const SettingsScreen = ({ navigation, route }) => {
  const [isAuto, setIsAuto] = useState(false);
  const isFocused = useIsFocused()
  const [data,setData] = useState({temp:"",humid:"",light:"",moist:""});
  const garden = route.params?.garden;
  useEffect(()=>{
    axios
      .get(
        "https://io.adafruit.com/api/v2/Potato_Stack/feeds/auto/data?limit=1"
      )
      .then((res) => setIsAuto(res.data[0].value==="1"?true:false))
    axios
      .get(
        "https://io.adafruit.com/api/v2/Potato_Stack/feeds/control/data?limit=1"
      )
      .then((res) => parseThreshold(res.data[0].value));
      
  },[isFocused])
  const parseThreshold = (str) => {
    const arr = str.split(" ");
    setData({
      temp: arr.slice(0, 2).join(" "),
      humid: arr.slice(2, 4).join(" "),
      light: arr.slice(4, 6).join(" "),
      moist: arr.slice(6).join(" "),
    });
  }
  const autoGarden = async () => {
    const headers = {
      "X-AIO-Key": await garden.x_aio_key,
    };
    await setIsAuto(!isAuto);
    await axios
      .post(
        "https://io.adafruit.com/api/v2/Potato_Stack/feeds/auto/data",
        { datum: { value: isAuto ? "0" : "1" } },
        { headers }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSetThreshold = async () => {
    const headers = {
      "X-AIO-Key": await garden.x_aio_key,
    };
    await axios
      .post(
        "https://io.adafruit.com/api/v2/Potato_Stack/feeds/control/data",
        {
          datum: {
            value: `${data.temp} ${data.humid} ${data.light} ${data.moist}`,
          },
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data);
      })
      .then(() =>
        Toast.show({
          type: "success",
          text1: "Procedure Complete",
          text2: "Threshold Updated",
        })
      )
      .catch((err) => console.log(err));
  }
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
          Settings
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
          Automatic Mode
        </Text>
        <View className="flex mr-auto flex-row items-center mb-3">
          <TouchableWithoutFeedback
            disabled={garden.x_aio_key ? false : true}
            onPress={autoGarden}
          >
            <View
              className={`flex-row items-center justify-start border border-gray-400 rounded-full p-2 ${
                isAuto ? "bg-green-500 border-green-500 mb-3" : null
              }`}
            >
              <View
                className={`w-6 h-6 rounded-full bg-gray-400 mr-2 ${
                  isAuto ? "bg-white" : null
                }`}
              />
              <Text className={`font-bold text-gray-600`}>
                {isAuto ? "ON" : "OFF"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 20,
            fontWeight: "500",
            color: "#000",
            marginBottom: 20,
          }}
        >
          Activation Threshold (Min-Max)
        </Text>
        <InputField
          label={"Temperature"}
          icon={
            <MaterialCommunityIcons
              name="temperature-celsius"
              size={20}
              color="#F84F31"
              style={{ marginRight: 5 }}
            />
          }
          value={data.temp}
          onChangeText={(t) => setData({ ...data, temp: t })}
          keyboardType="default"
        />
        <InputField
          label={"Humidity (%)"}
          icon={
            <MaterialCommunityIcons
              name="air-humidifier"
              size={20}
              color="#94dfff"
              style={{ marginRight: 5 }}
            />
          }
          value={data.humid}
          onChangeText={(t) => setData({ ...data, humid: t })}
          keyboardType="default"
        />

        <InputField
          label={"Luminance (lux)"}
          icon={
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={20}
              color="#ffcc00"
              style={{ marginRight: 5 }}
            />
          }
          value={data.light}
          onChangeText={(t) => setData({ ...data, light: t })}
          keyboardType="default"
        />

        <InputField
          label={"Moisture (%)"}
          icon={
            <MaterialCommunityIcons
              name="cup-water"
              size={20}
              color="#8F7265"
              style={{ marginRight: 5 }}
            />
          }
          value={data.moist}
          onChangeText={(t) => setData({ ...data, moist: t })}
          keyboardType="default"
        />

        <View className="flex-row">
          <CustomButton label={"Update"} onPress={() => handleSetThreshold()} />
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </View>
  );
}

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontFamily: "MontserratSemiBold",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "MontserratRegular",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      height={70}
      text1Style={{
        fontSize: 20,
        fontFamily: "MontserratSemiBold",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "MontserratRegular",
      }}
    />
  ),
};

export default SettingsScreen