import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import StackRoutes from "./routes/StackRoutes";

export default function App() {
  const [fonts] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fonts) return undefined;

  return <StackRoutes />;
}
