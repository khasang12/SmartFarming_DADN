import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const CustomDrawer = (props) => {
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState("Üser");
  const isFocused = useIsFocused();

  useEffect(()=>{
    const getName = async () => {
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) setName(userInfo?.name);
    }
    getName()
  },[isFocused])
  
  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#eef9bf", flex: 1 }}
      >
        <ImageBackground
          source={require("../assets/menu-bg.jpeg")}
          className="p-5"
        >
          <Image
            source={require("../assets/hcmut.png")}
            className="round-lg mb-2"
            style={{
              height: 80,
              width: 80,
            }}
          />
          <Text
            className="text-white mb-1"
            style={{
              fontSize: 18,
              fontFamily: "MontserratBold",
            }}
          >
            {name}
          </Text>
        </ImageBackground>
        <View className="flex-grow bg-[#eef9bf] pt-3">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="p-5 border-t-2 border-[#75b79e] bg-[#eef9bf]">
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          className="py-4"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="location-exit" size={22} />
            <Text
              className="ml-2"
              style={{
                fontSize: 15,
                fontFamily: "MontserratRegular",
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
