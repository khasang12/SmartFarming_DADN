import "react-native-gesture-handler";
import "./config/ignoreWarnings";
import { useFonts } from "expo-font";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation/AppNav";

export default function App() {
  const [loaded] = useFonts({
    HindRegular: require("./assets/fonts/Hind-Regular.ttf"),
    HindLight: require("./assets/fonts/Hind-Light.ttf"),
    HindBold: require("./assets/fonts/Hind-Bold.ttf"),
    HindSemiBold: require("./assets/fonts/Hind-SemiBold.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
