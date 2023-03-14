import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalStyles from "../config/GlobalStyles";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

import Logo from "../assets/ArgiVision.png";
import { AuthContext } from "../context/AuthContext";
const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View className="flex-1 justify-center bg-[#eef9bf]">
      <View className="px-5">
        <View className="items-center">
          <Image
            source={Logo}
            style={{ width: 200, height: 200 }}
            className="mb-4"
          />
        </View>

        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 38,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <InputField
          label={"Username"}
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="ascii-capable"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <CustomButton
          label={"Login"}
          onPress={() => {
            login();
          }}
        />

        <View className="flex-row justify-center, mb-5">
          <Text>No account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#6a8caf", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
