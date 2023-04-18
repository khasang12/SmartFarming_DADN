import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NotiScreen from "../screens/Noti/NotiScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";



import { GardenStack } from "./CRUDGardenStack";
import { HomeStack } from "./HomeStack";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#6a8caf"
      inactiveColor="#75b79e"
      tabBarColor="#23c552"
      barStyle={{ backgroundColor: "#a7e9af" }}
      shifting
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        tabBarIconStyle: { backgroundColor: "#6a8caf" },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Gardens"
        component={GardenStack}
        options={{
          tabBarLabel: "Gardens",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fence" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={NotiScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          tabBarBadge: 3,
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
