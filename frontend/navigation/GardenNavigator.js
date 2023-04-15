import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GardenActionPage from "../pages/GardenActionPage";
import GardenHistoryPage from "../pages/GardenHistoryPage";
import GardenInfoPage from "../pages/GardenInfoPage";

const Tab = createMaterialTopTabNavigator();

// Top Navigator for GardenScreen
const GardenNavigator = ({ garden }) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1677ff",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: "#eef9bf", fontFamily: "HindLight" },
      }}
    >
      <Tab.Screen
        name="Action"
        component={GardenActionPage}
        initialParams={{ garden: garden }}
      />
      <Tab.Screen
        name="History"
        component={GardenHistoryPage}
        initialParams={{ garden: garden }}
      />
      <Tab.Screen
        name="Info"
        component={GardenInfoPage}
        initialParams={{ garden: garden }}
      />
    </Tab.Navigator>
  );
};

export default GardenNavigator;
