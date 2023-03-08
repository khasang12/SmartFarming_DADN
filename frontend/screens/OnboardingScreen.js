import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../config/GlobalStyles";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <Onboarding
      style={GlobalStyles.PriFont}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#9ff731",
          fontFamily: "Montserrat",
          image: <Image source={require("../assets/ArgiVision_medium.png")} />,
          title: "Welcome to ArgiVision",
          subtitle: "An app that would ease your farmer life",
        },
        {
          backgroundColor: "#9ff731",
          fontFamily: "Montserrat",
          image: <Image source={require("../assets/OB1.png")} />,
          title: "Information",
          subtitle:
            "Visualize status from your fields and sensors in real-time environment",
        },
        {
          backgroundColor: "#9ff731",
          fontFamily: "Montserrat",
          image: <Image source={require("../assets/OB2.png")} />,
          title: "Operation",
          subtitle:
            "Create an scheduled plan for your devices to work automatically",
        },
        {
          backgroundColor: "#9ff731",
          fontFamily: "Montserrat",
          image: <Image source={require("../assets/OB3.png")} />,
          title: "Cooperation",
          subtitle: "Monitor your field by collaborating with other farmers",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
