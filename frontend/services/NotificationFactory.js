import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      channelId: "my-notification-channel",
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
}

// Concrete class for iOS push notifications
class IOSPushNotification extends PushNotification {
  async registerForPushNotifications() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for iOS', finalStatus);
      return null;
    }
  
    const pushToken = (await Notifications.getExpoPushTokenAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    })).data;
    console.log('Expo push token:', pushToken);
    
    // TODO: Save the push token to your server
    await AsyncStorage.setItem("expoPushToken", pushToken);
  }

  async createPushMsg(token,title,msg) {
    const message = {
      to: token,
      ios: {
        sound: 'default',
        title: title,
        body: msg,
        categoryId: 'my-notification-category',
      },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }
    )
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
