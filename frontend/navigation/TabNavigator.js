import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GardenScreen from "../screens/GardenScreen";
import HomeScreen from "../screens/HomeScreen";
import NotiScreen from "../screens/NotiScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#00d8ff"
      inactiveColor="#fff"
      tabBarColor="#aaa"
      barStyle={{ backgroundColor: "#006500" }}
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        tabBarIconStyle: { backgroundColor: "#006500" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Gardens"
        component={GardenScreen}
        options={{
          tabBarLabel: "Gardens",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fence" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotiScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
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
