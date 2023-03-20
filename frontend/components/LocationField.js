import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../components/InputField";

const LocationField = ({index, onChangeLat, onChangeLon}) => {
  return (
    <View className="flex-1 justify-center bg-[#eef9bf] pt-3">
      <ScrollView className="px-5">
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          Edge
        </Text>

        <InputField
          label={"Latitude"}
          icon={
            <MaterialIcons
              name="local-phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={username}
          onChangeText={(t) => onChangeLat(t)}
          keyboardType="phone-pad"
        />

        <InputField
          label={"Longitude"}
          icon={
            <MaterialIcons
              name="local-phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={username}
          onChangeText={(t) => onChangeLon(t)}
          keyboardType="phone-pad"
        />
      </ScrollView>
    </View>
  );
};

export default LocationField;
