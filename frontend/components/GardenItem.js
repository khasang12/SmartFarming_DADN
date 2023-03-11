import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';


const GardenItem = ({name,desc,lat,lon,humid,light,temp}) => {
  const navigation = useNavigation();
  
  return (
    <View className="bg-white p-3 mb-5 rounded-md">
      <View className="flex-row justify-between mb-5">
        <View>
          <Text style={{ fontSize: 18, fontFamily: "HindBold" }}>{name}</Text>
          <Text style={{ fontSize: 14, fontFamily: "HindLight" }}>
            Latitude: {lat}, Longitude: {lon}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate("GardenDetail")}}>
          <MaterialIcons color="#0aada8" size={30} name="edit" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-start mb-5 items-center">
        <ImageBackground
          source={require("../assets/hcmut.png")}
          style={{ width: 50, height: 50, justifyItems: "center"}}
          className="items-center flex-row ml-2"
          imageStyle={{ borderRadius: 25 }}
        />
        <View className="ml-10">
          <Text>Humidity: {humid}%</Text>
          <Text>Temperature: {temp}oC</Text>
          <Text>Light: {light}lux</Text>
        </View>
      </View>
    </View>
  );
}

export default GardenItem