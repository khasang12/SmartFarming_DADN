import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StatisticScreen from "../screens/ViewGarden/StatisticScreen";
import AddDeviceScreen from "../screens/AddGarden/AddDeviceScreen";
import AddBoundaryScreen from "../screens/AddGarden/AddBoundaryScreen";
import ViewMapScreen from "../screens/ViewGarden/ViewMapScreen";
import AddGardenScreen from "../screens/AddGarden/AddGardenScreen";
import DeviceScreen from "../screens/ViewGarden/DeviceScreen";
import GardenDetailScreen from "../screens/ViewGarden/GardenDetailScreen";
import GardenScreen from "../screens/ViewGarden/GardenScreen";
import SettingsScreen from "../screens/ViewGarden/SettingsScreen";

const Stack = createNativeStackNavigator();

export const GardenStack = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="Garden">
      <Stack.Screen
        name="Garden"
        component={GardenScreen}
        options={{ headerShown: false }}
        initialParams={
          route.params ? { garden: route.params.garden } : undefined
        }
      />
      <Stack.Screen
        name="AddGarden"
        component={AddGardenScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBoundary"
        component={AddBoundaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GardenDetail"
        component={GardenDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Device"
        component={DeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewMap"
        component={ViewMapScreen}
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
