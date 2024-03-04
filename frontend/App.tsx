import { useFonts } from "expo-font";
import StackRoutes from "./routes/StackRoutes";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  const [fonts] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fonts) return undefined;

  return (
    <Provider store={store}>
      <StackRoutes />
    </Provider>
  );
}
