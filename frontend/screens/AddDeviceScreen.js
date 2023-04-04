import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from 'react'
import { MultiSelect } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { BASE_URL } from "../config/config";


const AddDeviceScreen = ({navigation, route}) => {
  const {garden_name,desc,group_name,group_key,feeds,boundary} = route.params
  const data = feeds.map((item)=>({label: item.name, value: item.key}))
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [selectedFans, setSelectedFans] = useState([]);
  const [selectedMotors, setSelectedMotors] = useState([]);
  const [selectedPumps, setSelectedPumps] = useState([]);
  const handleAddGarden = async (e) => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    const sendingData = {
      name: garden_name,
      desc: desc,
      group_key: group_key,
      group_name: group_name,
      userId: await JSON.parse(userInfo)._id,
      topic_list: {
        sensor: selectedSensors,
        fan: selectedFans,
        pump: selectedMotors,
        motor: selectedPumps,
      },
      boundary: boundary || [],
    };
    console.log(sendingData);
    axios
      .post(`${BASE_URL}/garden/create`, sendingData)
      .then((res) => {
        console.log(res.data);
        Toast.show({
          type: "success",
          text1: "Procedure Complete",
          text2: "New garden created",
        });
        navigation.navigate("Garden");
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Procedure Incomplete",
          text2: "Something went wrong",
        });
      });

  };
  return (
    <View className="flex-1 justify-center bg-[#eef9bf] pt-5">
      <ScrollView className="px-5 pt-5">
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 38,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          New Garden
        </Text>

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 20,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          Map
        </Text>

        {boundary ? (
          <Text>Boundaries are added to the garden</Text>
        ) : (
          <Text>No boundaries found</Text>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("AddBoundary", route.params)}
          className="bg-[#1677ff] p-2 my-5 rounded-md w-2/3 justify-center items-center"
        >
          <Text
            className={`text-center text-white`}
            style={{
              fontFamily: "MontserratRegular",
              fontSize: 16,
            }}
          >
            Open map
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 20,
            fontWeight: "500",
            color: "#000",
            marginVertical: 30,
          }}
        >
          Sensors & Devices
        </Text>

        <View style={styles.container}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Sensors"
            searchPlaceholder="Search..."
            value={selectedSensors}
            onChange={(item) => {
              setSelectedSensors(item);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color="black"
                name="motion-sensor"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <View style={styles.container}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Pumps"
            searchPlaceholder="Search..."
            value={selectedPumps}
            onChange={(item) => {
              setSelectedPumps(item);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color="black"
                name="pump"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <View style={styles.container}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Motors"
            searchPlaceholder="Search..."
            value={selectedMotors}
            onChange={(item) => {
              setSelectedMotors(item);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color="black"
                name="curtains"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <View style={styles.container}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Fans"
            searchPlaceholder="Search..."
            value={selectedFans}
            onChange={(item) => {
              setSelectedFans(item);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color="black"
                name="fan"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <View className="justify-center flex-row mt-4">
          <CustomButton label={"Add"} onPress={() => handleAddGarden()} />
        </View>
      </ScrollView>
        <Toast config={toastConfig} />
    </View>
  );
}

export default AddDeviceScreen

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

const styles = StyleSheet.create({
  container: { paddingLeft: 8 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});