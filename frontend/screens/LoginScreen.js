import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../config/GlobalStyles"
const LoginScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View>
      <Text style={GlobalStyles.PriFont}>Login</Text>
      
    </View>
  );
};

export default LoginScreen;
