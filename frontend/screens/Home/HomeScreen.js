import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { sliderData, farmers, devices } from "../../data";
import Carousel from "react-native-snap-carousel";
import BannerSlider from "../../components/BannerSlider";
import { Dimensions, StyleSheet } from "react-native";
import CustomSwitch from "../../components/CustomSwitch";
import FarmerListItem from "../../components/FarmerListItem";
import SensorListItem from "../../components/SensorListItem";
import OutputListItem from "../../components/OutputListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/config";
import axios from "axios";
import HomeGardenItem from "../../components/HomeGardenItem";

const HomeScreen = ({navigation}) => {
  const [farmTab, setFarmTab] = useState(1);
  const [gardens, setGardens] = useState([]);
  const [data, setData] = useState(null)
  const isFocused = useIsFocused()

  useEffect(() => {
    AsyncStorage.getItem("userInfo")
      .then((data) => {
        setData(JSON.parse(data));
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (data!==null) {
      axios
        .get(`${BASE_URL}/garden?userId=${data?._id}`)
        .then((res) => setGardens(res.data))
        .catch((err) => console.log(err));
    }
  }, [isFocused,data]);

  if (data === null) {
    // Show a loading indicator while the data is being fetched
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const onSelectSwitch = (value) => {
    setFarmTab(value);
  };
  return (
    <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
      <ScrollView className="p-5 mb-2">
        {/* Header */}
        <View className="flex-row justify-between mb-5">
          {<Text style={{ fontSize: 24, fontFamily: "MontserratSemiBold" }}>
            Welcome{", "}
            <Text className="text-[#6a8caf]">
              {data?.name}
            </Text>
          </Text>}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../../assets/hcmut.png")}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        {/* Gardens */}
        <View className="my-4 flex-row justify-between items-center">
          <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
            Recently visited
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GardenStack");
            }}
          >
            <Text style={{ color: "#0aada8" }}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {gardens &&
            gardens.map((item, index) => (
              <HomeGardenItem key={index} garden={item} />
            ))}
        </ScrollView>

        {/* <Carousel
          data={sliderData}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          renderItem={renderBanner}
          loop={true}
          hasParallaxImages={true}
        /> */}

        {/* Devices & Farmers */}
        <View className="mt-8 flex-row justify-between">
          <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
            Devices & Farmers
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Sensors"
            option2="Outputs"
            option3="Farmers"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {farmTab == 1 &&
          devices
            .filter((item) => item.type === "sensor")
            .map((item, index) => (
              <OutputListItem
                key={index}
                otype="device"
                name={item.name}
                item={item}
                disable={true}
                photo="https://icon2.cleanpng.com/20180717/kvf/kisspng-computer-icons-share-icon-iot-icon-5b4e0ea4b7cbf7.5834559515318422127528.jpg"
                onPress={() => navigation.navigate("Device", item)}
              />
            ))}
        {farmTab == 2 &&
          devices
            .filter((item) => item.type !== "sensor")
            .map((item, index) => (
              <SensorListItem
                key={index}
                otype="sensor"
                name={item.name}
                item={item}
                disable={true}
                photo="https://icon2.cleanpng.com/20180717/kvf/kisspng-computer-icons-share-icon-iot-icon-5b4e0ea4b7cbf7.5834559515318422127528.jpg"
                onPress={() => navigation.navigate("Device", item)}
              />
            ))}
        {farmTab == 3 &&
          farmers.map((item, index) => (
            <FarmerListItem
              key={index}
              otype="farmer"
              name={item.name}
              email={item.email}
              phone={item.phone}
              disable={true}
              photo="https://icon2.cleanpng.com/20180420/gee/kisspng-computer-icons-farmer-icon-design-clip-art-farmer-5ada50596fc531.0730372315242568574578.jpg"
              onPress={() => {}}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
