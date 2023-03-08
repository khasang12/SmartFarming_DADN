import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  DroidSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 60 : 0,
  },
  PriFont: {
    fontFamily: "Montserrat",
    fontSize: 30
  },
  SecFont: {
    fontFamily: "Hind"
  }
});
