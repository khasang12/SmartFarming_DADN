import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GardenActionPage from '../pages/GardenActionPage';
import GardenHistoryPage from '../pages/GardenHistoryPage';
import GardenInfoPage from '../pages/GardenInfoPage';

const Tab = createMaterialTopTabNavigator();

const GardenNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1677ff",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: "#eef9bf", fontFamily: "HindLight" },
      }}
    >
      <Tab.Screen name="Action" component={GardenActionPage} />
      <Tab.Screen name="History" component={GardenHistoryPage} />
      <Tab.Screen name="Info" component={GardenInfoPage} />
    </Tab.Navigator>
  );
}

export default GardenNavigator