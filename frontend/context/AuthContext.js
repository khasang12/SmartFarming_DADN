import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/config";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const showFailedToast = (text1, text2 = None) => {
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2,
    });
  };

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        setUserInfo(JSON.stringify(res.data.user));
        console.log(res.data);
        setUserToken(res.data.access_token);
        AsyncStorage.setItem("userToken", res.data.access_token);
        AsyncStorage.setItem("userInfo", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        showFailedToast("Login failed", "Incorrect Email or Password");
        console.log(err)
      });
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
      <Toast config={toastConfig}/>
    </AuthContext.Provider>
  );
};


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
