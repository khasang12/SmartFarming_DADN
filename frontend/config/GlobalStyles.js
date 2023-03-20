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

export const bgColor = "#eef9bf"
export const fgColor = "#a7e9af"
export const ctaColor1 = "#75b79e"
export const ctaColor2 = "#6a8caf";
