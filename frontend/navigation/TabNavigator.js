import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddGardenScreen from "../screens/AddGardenScreen";
import DeviceScreen from "../screens/DeviceScreen";
import GardenDetailScreen from "../screens/GardenDetailScreen";
import GardenScreen from "../screens/GardenScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import NotiScreen from "../screens/NotiScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StatisticScreen from "../screens/StatisticScreen";


const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home2"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const GardenStack = () => {
  return (
    <Stack.Navigator initialRouteName="Garden">
      <Stack.Screen
        name="Garden"
        component={GardenScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGarden"
        component={AddGardenScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GardenDetail"
        component={GardenDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GardenProfile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Device"
        component={DeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistic"
        component={StatisticScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

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
        name="Home"
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
      <Tab.Screen
        name="Notifications"
        component={NotiScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          tabBarBadge: 3,
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
