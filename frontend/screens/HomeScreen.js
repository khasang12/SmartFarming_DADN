import { View, Image } from "react-native";
import Logo from "../assets/ArgiVision.png";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View className="w-100 bg-[#9ff731] h-full flex justify-center items-center">
      <View className="w-50">
        <Image source={Logo} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
};

export default HomeScreen;
