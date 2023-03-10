import { View, Text, Image, Switch, ImageBackground } from "react-native";
import React, { useState } from "react";
import FanPage from "../pages/FanPage";
import PumpPage from "../pages/PumpPage";
import CurtainPage from "../pages/CurtainPage";

const OutputComponent = ({ props }) => {
  return (
    <View>
      {props.type == "fan" && <FanPage props={props} />}
      {props.type == "curtain" && <CurtainPage props={props} />}
      {props.type == "pump" && <PumpPage props={props} />}
    </View>
  );
};

const DeviceScreen = ({ route, navigation }) => {
  const {otype} = route.params;
  return (
    <View className="pt-10 flex-1 justify-start bg-[#9ff731] px-3">
      {otype === "output" && <OutputComponent props={route.params} />}
    </View>
  );
};

export default DeviceScreen;
