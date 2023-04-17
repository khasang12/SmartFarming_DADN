import { View, Text, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../../config/GlobalStyles";
import LottieView from "lottie-react-native";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);

  useEffect(() => {
    animation?.current?.play();
  }, []);

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
          backgroundColor: "#eef9bf",
          fontFamily: "Montserrat",
          image: (
            <Image source={require("../../assets/ArgiVision_medium.png")} />
          ),
          title: (
            <Text
              className="text-[40px] font-semibold"
              style={{
                color: "#75b79e",
                fontFamily: "MontserratSemiBold",
              }}
            >
              ArgiVision
            </Text>
          ),
          subtitle: (
            <Text
              className="mx-2 text-[22px] text-center font-semibold"
              style={{
                color: GlobalStyles.SecColor,
                fontFamily: "MontserratLight",
              }}
            >
              An app that would ease your farmer life
            </Text>
          ),
        },
        {
          backgroundColor: "#eef9bf",
          fontFamily: "Montserrat",
          image: (
            <LottieView
              ref={animation}
              source={require("../../assets/images/OB1.json")}
              autoPlay
              loop
              speed={5}
              style={{ width: 260, height: 260 }}
            />
          ),
          title: (
            <Text
              className="text-[40px] font-semibold"
              style={{
                color: "#75b79e",
                fontFamily: "MontserratSemiBold",
              }}
            >
              Information
            </Text>
          ),
          subtitle: (
            <Text
              className="mx-2 text-[22px] text-center font-semibold"
              style={{
                color: GlobalStyles.SecColor,
                fontFamily: "MontserratLight",
              }}
            >
              Visualize status from your fields and sensors in real-time
              environment
            </Text>
          ),
        },
        {
          backgroundColor: "#eef9bf",
          fontFamily: "Montserrat",
          image: (
            <LottieView
              ref={animation}
              source={require("../../assets/images/OB2.json")}
              autoPlay
              loop
              speed={1}
              style={{ width: 260, height: 260 }}
            />
          ),
          title: (
            <Text
              className="text-[40px] font-semibold"
              style={{
                color: "#75b79e",
                fontFamily: "MontserratSemiBold",
              }}
            >
              Operation
            </Text>
          ),
          subtitle: (
            <Text
              className="mx-2 text-[22px] text-center font-semibold"
              style={{
                color: GlobalStyles.SecColor,
                fontFamily: "MontserratLight",
              }}
            >
              Create an scheduled plan for your devices to work automatically
            </Text>
          ),
        },
        {
          backgroundColor: "#eef9bf",
          fontFamily: "Montserrat",
          image: (
            <LottieView
              ref={animation}
              source={require("../../assets/images/OB3.json")}
              autoPlay
              loop
              speed={1}
              style={{ width: 260, height: 260 }}
            />
          ),
          title: (
            <Text
              className="text-[40px] font-semibold"
              style={{
                color: "#75b79e",
                fontFamily: "MontserratSemiBold",
              }}
            >
              Cooperation
            </Text>
          ),
          subtitle: (
            <Text
              className="mx-2 text-[22px] text-center font-semibold"
              style={{
                color: GlobalStyles.SecColor,
                fontFamily: "MontserratLight",
              }}
            >
              Monitor your field by collaborating with other farmers
            </Text>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
