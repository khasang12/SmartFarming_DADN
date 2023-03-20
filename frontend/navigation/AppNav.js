import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
