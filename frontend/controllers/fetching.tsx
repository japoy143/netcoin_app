import axios from "axios";
import { Alert } from "react-native";
import { setCoins } from "../redux/data";
import { setDaily } from "../redux/week";
import { setNotifications } from "../redux/notifications";

// all dispatch function must come from parent directory
interface fetchData {
  dispatch: any;
}

// for fetching crypto
export const fetchCrypto = async ({ dispatch }: fetchData) => {
  try {
    const coins = await axios.get(`${process.env.API_CRYPTO}`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
    });
    dispatch(setCoins(coins.data["data"]));
    const data = coins.data["data"];
    const filtered = data.filter(
      (price: { [x: string]: string }) =>
        parseInt(price["changePercent24Hr"]) > 10 ||
        parseInt(price["changePercent24Hr"]) < 0
    );
    const dataObjects = filtered.flatMap((items: { [x: string]: any }) => ({
      name: items["name"],
      symbol: items["symbol"],
      price: items["priceUsd"],
      percentage: items["changePercent24Hr"],
      read: 0,
    }));
    console.log(filtered, "Objects");

    const updateNotifications = await axios.patch(
      `${process.env.NOTIFICATION_API}/${process.env.APP_ID}`,
      {
        message: dataObjects,
        read: 0,
      }
    );
  } catch (error) {
    Alert.alert("Fetching Error", "Data not Fetch");
  }
};

//for fetching daily updates
export const fetchDailyUpdates = async ({ dispatch }: fetchData) => {
  try {
    const stats = await axios.get(`${process.env.STATISTICS_API}`);
    dispatch(setDaily(stats.data["stats"]));
  } catch (error) {
    Alert.alert("Fetching Error", "Data not Fetch");
  }
};

//for fetching notifications
export const fetchNotifications = async ({ dispatch }: fetchData) => {
  try {
    const notification = await axios.get(`${process.env.NOTIFICATION_API}`);
    dispatch(setNotifications(notification.data["notif"]));
  } catch (error) {
    Alert.alert("Fetching Error", "Data not Fetch");
  }
};
