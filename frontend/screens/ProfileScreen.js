import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import React from "react";

const ProfileScreen = ({ route, navigation }) => {
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
        <Text className="font-bold text-3xl mt-3 p-2">Sang Kha</Text>
        <Text>Email: smartfarming@hcmut.edu.vn</Text>
        <Text>Phone: 0782412388</Text>
      </View>

      {/* Settings */}
      <View></View>
    </View>
  );
};

export default ProfileScreen;
