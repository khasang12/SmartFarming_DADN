import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UNUserNotificationCenter } from "expo";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// Abstract Factory Pattern

class NotificationServiceFactory {
  createPushNotification() {
    throw new Error("createPushNotification() method must be implemented");
  }
}

class AndroidPushNotificationFactory extends NotificationServiceFactory {
  createPushNotification() {
    return new AndroidPushNotification();
  }
}

class IOSPushNotificationFactory extends NotificationServiceFactory {
  createPushNotification() {
    return new IOSPushNotification();
  }
}

class PushNotification {
  constructor() {
    if (new.target === PushNotification) {
      throw new Error(
        "PushNotification is an abstract class and cannot be instantiated directly"
      );
    }
  }

  async registerForPushNotifications() {
    throw new Error(
      "registerForPushNotifications() method must be implemented"
    );
  }

  async createPushMsg(token, title, msg) {
    throw new Error(
      "createPushMsg(token, title, msg) method must be implemented"
    );
  }

  async schedulePushMsg(title, msg, time) {
    throw new Error(
      "schedulePushMsg(title, msg, time) method must be implemented"
    );
  }

  async handleNotificationResponseListener() {
    throw new Error(
      "handleNotificationResponseListener() method must be implemented"
    );
  }

  async destroyNotificationResponseListener() {
    throw new Error(
      "destroyNotificationResponseListener() method must be implemented"
    );
  }
}

// Concrete class for Android push notifications
class AndroidPushNotification extends PushNotification {
  async registerForPushNotifications() {
    // Register for FCM
    try {
      // Request permission to receive notifications
      const { status } = await Notifications.requestPermissionsAsync();

      // If permission is granted, get the device token
      if (status === "granted") {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        const pushToken = tokenData.data;

        // If a token is returned, save it to your server
        if (pushToken) {
          // Save the token to your server
          console.log("Expo push token:", pushToken);
        }
        await AsyncStorage.setItem("expoPushToken", pushToken);
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
        }),
      });
    } catch (error) {
      console.log("Error registering for push notifications:", error);
    }
  }

  async createPushMsg(token, title, msg) {
    const message = {
      to: token,
      title: title,
      body: msg,
      data: { index: 0 },
      channelId: "alert",
      android: {
        sound: true,
        priority: "high",
        data: { index: 0 },
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    console.log("Notification sent");
  }

  async schedulePushMsg(title, msg, time) {
    await Notifications.setNotificationChannelAsync("schedule", {
      name: "Schedule notifications",
      importance: Notifications.AndroidImportance.HIGH,
    });
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: msg,
      },
      trigger: {
        seconds: time,
        channelId: "schedule",
        repeats: true,
      },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async handleNotificationResponseListener(callback) {
    const handleNotificationResponse = (response) => {
      // console.log(response);
      // handle the click action here
      if (response.notification.request.content.data) {
        const data = response.notification.request.content.data;
        callback(data.index);
      }
    };
    const sub = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return sub;
  }

  async destroyNotificationResponseListener(listener) {
    if (listener) {
      listener.remove();
    }
  }
}

// Concrete class for iOS push notifications
class IOSPushNotification extends PushNotification {
  async registerForPushNotifications() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for iOS", finalStatus);
      return null;
    }

    const pushToken = (
      await Notifications.getExpoPushTokenAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      })
    ).data;
    console.log("Expo push token:", pushToken);

    // TODO: Save the push token to your server
    await AsyncStorage.setItem("expoPushToken", pushToken);
  }

  async createPushMsg(token, title, msg) {
    const message = {
      to: token,
      ios: {
        sound: "default",
        title: title,
        body: msg,
        categoryId: "alert",
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async schedulePushMsg(title, msg, time) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    await Notifications.setNotificationChannelAsync("schedule", {
      name: "Schedule notifications",
      importance: Notifications.AndroidImportance.HIGH,
    });
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: msg,
      },
      trigger: {
        seconds: time,
        channelId: "schedule",
        repeats: true,
      },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async handleNotificationResponseListener() {
    const handleNotificationResponse = (response) => {
      // console.log(response);
      // handle the click action here
      console.log(response.notification.request.content.data);
      if (response.notification.request.content.data) {

        const data = response.notification.request.content.data;
        console.log("Data:", data);
      }
    };
    UNUserNotificationCenter.setDelegate({
      handleNotificationResponse: handleNotificationResponse,
    });
  }

  async destroyNotificationResponseListener(listener) {
    if (listener) {
      listener.remove();
    }
  }
}

// Use the abstract factory to create push notification objects
export function createPushNotificationFactory() {
  if (Platform.OS === 'android') {
    return new AndroidPushNotificationFactory();
  } else if (Platform.OS === 'ios') {
    return new IOSPushNotificationFactory();
  } else {
    throw new Error('Unsupported platform');
  }
}
