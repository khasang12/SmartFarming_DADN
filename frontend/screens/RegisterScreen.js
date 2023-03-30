import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalStyles from "../config/GlobalStyles";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../assets/ArgiVision.png";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import axios from "axios";
import { BASE_URL } from "../config/config";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({fname:"",email:"",phone:"",username:"",password:"",repassword:"",aio:""});
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const showFailedToast = (text1, text2=None) => {
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2,
    });
  };

  const showSuccessToast = (text1, text2 = None) => {
    Toast.show({
      type: "success",
      text1: text1,
      text2: text2,
    });
  };

  const handleSubmit = async () => {
    // validation
    const {fname,email,phone,username,password,repassword,aio} = data
    if (password != repassword) {
      showFailedToast('Registration failed','Incorrect re-password')
    }
    if (password === ""){
      showFailedToast("Registration failed", "Password must not be blank");
    }
    if (email === "") {
      showFailedToast("Registration failed", "Email must not be blank");
    }
    if (username === "") {
      showFailedToast("Registration failed", "Username must not be blank");
    }

    // sending data
    const sendData = {name:fname, email: email, password: password, phone: phone, x_aio_key: aio}
    await axios
      .post(`${BASE_URL}/user`, sendData)
      .then((res) => {
        console.log(res.data);
        showSuccessToast("Registration successful", "Account Created");
        navigation.navigate('Login');
      })
      .catch((err) => {
        showFailedToast("Registration failed", "Account Existed");
        console.log(err);
      });
  }
  return (
    <View className="flex-1 justify-center bg-[#eef9bf] pt-5">
      <ScrollView className="px-5">
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
          Register
        </Text>

        <InputField
          label={"Email (*)"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.email}
          onChangeText={(t) => setData({ ...data, email: t })}
          keyboardType="email-address"
        />

        <InputField
          label={"Username (*)"}
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.username}
          onChangeText={(t) => setData({ ...data, username: t })}
          keyboardType="default"
        />

        <InputField
          label={"Password (*)"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.password}
          onChangeText={(t) => setData({ ...data, password: t })}
          inputType="password"
        />

        <InputField
          label={"Retype Password (*)"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.repassword}
          onChangeText={(t) => setData({ ...data, repassword: t })}
          inputType="password"
        />

        <InputField
          label={"Full name"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.fname}
          onChangeText={(t) => setData({ ...data, fname: t })}
          keyboardType="default"
        />

        <InputField
          label={"Phone"}
          icon={
            <MaterialIcons
              name="local-phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.phone}
          onChangeText={(t) => setData({ ...data, phone: t })}
          keyboardType="phone-pad"
        />

        <InputField
          label={"AdafruitIO X-AIO Key"}
          icon={
            <Ionicons
              name="ios-home-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={data.aio}
          onChangeText={(t) => setData({ ...data, aio: t })}
          keyboardType="default"
        />

        <CustomButton label={"Register"} onPress={() => handleSubmit()} />

        <View className="flex-row justify-center, mb-5">
          <Text>Got an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#4285F4", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </View>
  );
};

export default RegisterScreen;

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
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
      height = {70}
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
