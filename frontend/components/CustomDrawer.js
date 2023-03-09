import React from "react";
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

import Ionicons from "react-native-vector-icons/Ionicons";

const CustomDrawer = (props) => {
  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#9ff731", flex:1 }}
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
            Sang Kha
          </Text>
        </ImageBackground>
        <View className="flex-grow bg-[#9ff731] pt-3">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="p-5 border-t-2 border-[#006500] bg-[#9ff731]">
        <TouchableOpacity onPress={() => {}} className="py-4">
          <View className="flex-row items-center">
            <Ionicons name="exit-outline" size={22} />
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
