import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  const getProfile = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      setUserInfo(userInfo);
      console.log(userInfo);
    }
  }
  useEffect(()=>{
    getProfile()
  },[])
  return (
    <View className="pt-5 flex-col flex-1 bg-[#eef9bf] items-center">
      <View className="flex-1 mt-5 justify-center items-center flex-col w-full">
        <View className="pt-6">
          <ImageBackground
            source={require("../assets/hcmut.png")}
            style={{ width: 80, height: 80 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </View>
        <Text className="font-bold text-3xl mt-3 p-2">{userInfo?.name}</Text>
        <Text>Email: {userInfo?.email}</Text>
        <Text>Phone: {userInfo?.phone}</Text>
        {/* <Text>Create at: {userInfo?.create_at}</Text> */}
      </View>

      {/* Settings */}
      <View></View>
    </View>
  );
};

export default ProfileScreen;
