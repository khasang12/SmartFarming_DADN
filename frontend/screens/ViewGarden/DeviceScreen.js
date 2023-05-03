import { View, Text, Image, Switch } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; 
import LottieView from 'lottie-react-native'
import { MQTTContext } from "../../context/MQTTContext";


const DeviceScreen = ({ route, navigation }) => {
  const animation = useRef(null);
  const { name, feed_key, type, status, value, desc, last_update,conn} =
    route.params;
  console.log(conn);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleEnable = async () => {
    curValue = !isEnabled
    setIsEnabled(curValue)
    conn.publish(feed_key,curValue? "1" : "0" )
    animation.current.reset();
    if (!isEnabled) {animation.current.play()}
  };

  // Get first status
  useEffect(() => {
    async function fetchData() {
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      axios
        .get(
          "https://io.adafruit.com/api/v2/" + feed_key + "/data",
          {
            headers: {
              "X-AIO-Key": userInfo.x_aio_key,
            },
          }
        )
        .then((res) => setIsEnabled(res.data[0].value == "1" ? true : false))
        .catch((err) => console.log(err));
    }
    fetchData();
    if(conn.connected == true)
    {
      try 
      {
        conn.subcribeTopic(feed_key,handleUpdate);
      }
      catch(err) 
      {
        console.log(err);
      }
    }

  },[])
  
  handleUpdate = (string) => {
    setIsEnabled(string == "1" ? true : false)
  }

  return (
    <View className="flex-col justify-items-start pt-5 px-3 bg-[#eef9bf] flex-1">
      <Text
        className="font-bold text-5xl mb-2 mt-4"
        style={{ fontFamily: "MontserratBold" }}
      >
        {name}
      </Text>
      <View className="p-4 bg-white w-full rounded-xl mb-6">
        <Text className="text-lg">Feed Key: {feed_key}</Text>
        <Text className="text-lg">Device Type: {type}</Text>
        <Text className="text-lg">Status: {isEnabled ? "On" : "Off"}</Text>
        {/* <Text className="text-lg">Value: {value.$numberDecimal}</Text> */}
        <Text className="text-lg">
          Last Update: {moment().format("DD/MM/YYYY HH:mm:ss")}
        </Text>
      </View>
      <View className="flex-col items-center">
        {type == "fan" && (
          <LottieView
            ref={animation}
            style={{
              width: 166,
              height: 230,
            }}
            source={require("../../assets/images/fan.json")}
          />
        )}
        {type == "motor" && (
          <LottieView
            ref={animation}
            style={{
              width: 266,
              height: 230,
            }}
            source={require("../../assets/images/motor.json")}
          />
        )}
        {type == "pump" && (
          <LottieView
            ref={animation}
            style={{
              width: 266,
              height: 230,
            }}
            source={require("../../assets/images/pump.json")}
          />
        )}

        <View className="flex-row justify-between">
          <View className="flex-col items-center justify-center mt-4">


            {isEnabled != null && (
              <Switch
                style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
                trackColor={isEnabled ? "#767577" : "#81b0ff"}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleEnable}
                value={isEnabled}
              />
            )}
          </View>
          {/* <View className="flex-col items-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAuto ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleAuto}
              value={isAuto}
            />
            <Text className="text-lg">AUTO</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default DeviceScreen;
