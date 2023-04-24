import {
  View,
  Text
} from "react-native";
import {Picker} from "@react-native-picker/picker";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, List, Switch } from "react-native-paper";
import { Card, CardContent } from "react-native-cards";
import { createPushNotificationFactory } from "../../services/NotificationFactory";
import axios from "axios";
import { BASE_URL } from "../../config/config";

const ProfileScreen = ({ route, navigation }) => {
  const [listener, setListener] = useState(null)
  const [userInfo, setUserInfo] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [schedulerEnabled, setSchedulerEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");

  const pushNotificationFactory = createPushNotificationFactory();
  const pushNotification = pushNotificationFactory.createPushNotification();

  const handleToggleNotifications = async () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (notificationsEnabled) return pushNotification.destroyNotificationResponseListener();
    let userInfo = await AsyncStorage.getItem("userInfo");
    if (!notificationsEnabled)
      await axios
        .get(`${BASE_URL}/garden?userId=${JSON.parse(userInfo)._id}`)
        .then((res) => pushNotification.handleNotificationResponseListener((index) => {
            navigation.navigate("Gardens", { garden: res.data[index] });
          })
        )
        .then((res) => 
          setListener(res)
        )
        .catch((err) => console.log(err));
  };

  const handleToggleScheduler = async () => {
    setSchedulerEnabled(!schedulerEnabled);
  }

  const scheduleMsg = async (time) => {
    await pushNotification.createPushMsg(
      "Reminder",
      "Please remember to water your plants",
      eval(time)*60
    );
  };

  const getProfile = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }
  useEffect(()=>{
    pushNotification.destroyNotificationResponseListener(listener);
    getProfile();
  },[])
  useEffect(() => {
    if (selectedValue != "0"){
      scheduleMsg(selectedValue)
      console.log("done");
    }
  }, [selectedValue]);
  return (
    <View className="pt-5 flex-col flex-1 bg-[#eef9bf]">
      <Card
        style={{ margin: 25, paddingVertical: 40 }}
        className="rounded-lg opacity-80 bg-[#eef9bf]"
      >
        {/* <CardTitle title="Profile" /> */}
        <CardContent>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image
              size={128}
              source={require("../../assets/hcmut.png")}
              style={{ backgroundColor: "white" }}
            />
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                marginTop: 16,
                fontSize: 30,
              }}
            >
              {userInfo?.name}
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                marginTop: 8,
                fontSize: 18,
              }}
            >
              {userInfo?.email}
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                marginTop: 8,
                fontSize: 18,
              }}
            >
              {userInfo?.phone}
            </Text>
          </View>
        </CardContent>
      </Card>

      <View style={{ flex: 1, marginHorizontal: 15 }} className="ml-6 pl-3">
        {/* <List.Section>
          <List.Subheader>General</List.Subheader>
          <List.Item
            title="Language"
            description="English"
            left={() => <List.Icon icon="translate" />}
          />
          <List.Item
            title="Dark Mode"
            description="Off"
            left={() => <List.Icon icon="brightness-4" />}
          />
        </List.Section> */}
        <List.Section>
          {/* <List.Subheader>Notifications</List.Subheader> */}
          <List.Item
            title="Push Notifications"
            description="Receive notifications"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
              />
            )}
          />
          <List.Item
            title="Schedule"
            description="Watering Reminders"
            left={() => <List.Icon icon="clock" />}
            right={() => (
              <Switch
                value={schedulerEnabled}
                onValueChange={handleToggleScheduler}
              />
            )}
          />
          {schedulerEnabled && (
            <Picker
              style={{ marginHorizontal: 22 }}
              className="mr-2"
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="None" value="0" />
              <Picker.Item label="1 hour" value="60" />
              <Picker.Item label="2 hours" value="120" />
              <Picker.Item label="3 hours" value="180" />
              <Picker.Item label="6 hours" value="360" />
              <Picker.Item label="9 hours" value="540" />
            </Picker>
          )}
        </List.Section>
      </View>
    </View>
  );
};

export default ProfileScreen;
